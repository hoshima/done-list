import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { ListItemCreate } from '../../types/list-item.type';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { filter } from 'rxjs';
import { SupabaseService } from '../../services/supabase.service';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    ListComponent,
    MatFabButton,
    MatFormField,
    MatInputModule,
    FormsModule,
    MatIcon,
  ],
  templateUrl: './list-page.component.html',
  host: {
    class: 'block container mx-auto',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListPageComponent {
  readonly #dialog = inject(MatDialog);
  readonly #supabaseService = inject(SupabaseService);

  searchValue = signal('');
  fetchTasksOnSearch = effect(() => {
    this.#supabaseService.fetchTasks(this.searchValue());
  });

  openAddDialog() {
    this.#dialog
      .open<TaskFormComponent, null, ListItemCreate>(TaskFormComponent, {
        panelClass: ['w-10/12', 'md:w-4/12'],
      })
      .afterClosed()
      .pipe(filter((x): x is Exclude<typeof x, undefined> => x != null))
      .subscribe(async (task) => {
        await this.#supabaseService.addTask(task);
      });
  }
}
