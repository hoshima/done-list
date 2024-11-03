import {
  ChangeDetectionStrategy,
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
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskId, UserId } from '../../types/branded.type';
import { Tables } from '../../types/database.types';

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
  readonly #dialog = inject(MatDialog);
  readonly #snackBar = inject(MatSnackBar);

  tasks = this.#supabaseService.tasksSignal;

  async ngOnInit(): Promise<void> {
    const session: Session = this.#activatedRoute.snapshot.data['user'];
    const tasks = await this.#supabaseService.tasks(session.user.id as UserId);
    this.#supabaseService.tasksSignal.set(tasks.data);
  }

  deleteItem = output<[string, string]>();

  async clickEditItem(id: TaskId) {
    const { data: item } = await this.#supabaseService.getTask(id);
    if (!item) {
      this.#snackBar.open(`アイテムが存在しません`);
      return;
    }

    this.#dialog
      .open<
        TaskFormComponent,
        Tables<'tasks'>,
        Pick<Tables<'tasks'>, 'id' | 'name' | 'date' | 'description'>
      >(TaskFormComponent, {
        data: { ...item, id },
        panelClass: ['w-10/12', 'md:w-4/12'],
      })
      .afterClosed()
      .pipe(filter((x): x is Exclude<typeof x, undefined> => x != null))
      .subscribe(async (task) => {
        await this.#supabaseService.updateTask(task.id as TaskId, task);
      });
  }

  async clickDeleteItem(id: TaskId, name: string | null) {
    if (!confirm(`${name ?? 'タイトル未設定'}を削除しますか？`)) {
      return;
    }

    await this.#supabaseService.deleteTask(id);

    this.#snackBar.open(`${name}を削除しました`);
  }
}
