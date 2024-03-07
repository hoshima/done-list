import { Component, inject } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { CreateListItem, ListItem } from '../../interfaces/list-item';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../../components/form/form.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [ListComponent, MatFabButton, MatIcon],
  templateUrl: './list-page.component.html',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'block container mx-auto',
  },
})
export default class ListPageComponent {
  readonly #dialog = inject(MatDialog);

  list: ListItem[] = [];

  constructor() {
    const list = localStorage.getItem('list');
    if (list) {
      this.list = JSON.parse(list);
    }
  }

  onDeleteItem(id: string) {
    this.list = this.list.filter((x) => x.id !== id);

    localStorage.setItem('list', JSON.stringify(this.list));
  }

  openAddDialog() {
    this.#dialog
      .open<FormComponent, null, CreateListItem>(FormComponent)
      .afterClosed()
      .pipe(filter((x): x is Exclude<typeof x, undefined> => x != null))
      .subscribe((x) => this.addTask(x));
  }

  private addTask(task: CreateListItem) {
    this.list.push({
      id: crypto.randomUUID(),
      ...task,
    });

    localStorage.setItem('list', JSON.stringify(this.list));
  }
}
