import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { Session } from '@supabase/supabase-js';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { ListItem } from '../../types/list-item.type';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    DatePipe,
    MatCard,
    MatCardContent,
    MatIconButton,
    MatIcon,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './list.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #supabaseService = inject(SupabaseService);
  readonly #cd = inject(ChangeDetectorRef);
  readonly #dialog = inject(MatDialog);
  readonly #snackBar = inject(MatSnackBar);

  tasks:
    | {
        id: string;
        name: string;
        date: string;
        description: string;
      }[]
    | null = null;

  async ngOnInit(): Promise<void> {
    const session: Session = this.#activatedRoute.snapshot.data['user'];
    this.tasks = (await this.#supabaseService.tasks(session.user.id)).data;
    this.#cd.detectChanges();
  }

  deleteItem = output<[string, string]>();

  async clickEditItem(id: string) {
    const item = await this.#supabaseService.getTask(id);
    if (!item) {
      this.#snackBar.open(`アイテムが存在しません`);
      return;
    }

    this.#dialog
      .open<TaskFormComponent, ListItem, ListItem>(TaskFormComponent, {
        data: { ...item.data, id },
        panelClass: ['w-10/12', 'md:w-4/12'],
      })
      .afterClosed()
      .pipe(filter((x): x is Exclude<typeof x, undefined> => x != null))
      .subscribe(async (task) => {
        await this.#supabaseService.updateTask(task.id, task);
      });
  }

  clickDeleteItem(id: string, name: string) {
    this.deleteItem.emit([id, name]);
  }
}
