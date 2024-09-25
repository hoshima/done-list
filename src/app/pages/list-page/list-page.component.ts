import { Component, inject } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { CreateListItem, ListItem } from '../../interfaces/list-item';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { filter } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FirestoreService } from '../../services/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [ListComponent, MatFabButton, MatIcon, AsyncPipe],
  templateUrl: './list-page.component.html',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'block container mx-auto',
  },
})
export default class ListPageComponent {
  readonly #dialog = inject(MatDialog);
  readonly #snackBar = inject(MatSnackBar);
  readonly #firestoreService = inject(FirestoreService);

  onDeleteItem([id, name]: [string, string]) {
    if (!confirm(`${name}を削除しますか？`)) {
      return;
    }

    this.#firestoreService.deleteTask(id);
    this.#snackBar.open(`${name}を削除しました`);
  }

  async onEditItem(id: string) {
    const item = await this.#firestoreService.getTaskData(id);
    if (!item) {
      this.#snackBar.open(`アイテムが存在しません`);
      return;
    }

    this.#dialog
      .open<TaskFormComponent, ListItem, ListItem>(TaskFormComponent, {
        data: { ...item, id },
      })
      .afterClosed()
      .pipe(filter((x): x is Exclude<typeof x, undefined> => x != null))
      .subscribe((task) => this.#firestoreService.updateTask(task.id, task));
  }

  openAddDialog() {
    this.#dialog
      .open<TaskFormComponent, null, CreateListItem>(TaskFormComponent)
      .afterClosed()
      .pipe(filter((x): x is Exclude<typeof x, undefined> => x != null))
      .subscribe((task) => this.#firestoreService.addTask(task));
  }
}
