import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { ListItemCreate } from '../../types/list-item.type';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { filter } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from '@angular/fire/auth';
import { SupabaseService } from '../../services/supabase.service';
import { UserId } from '../../types/branded.type';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [ListComponent, MatFabButton, MatIcon, AsyncPipe],
  templateUrl: './list-page.component.html',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'block container mx-auto',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListPageComponent {
  readonly #dialog = inject(MatDialog);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #supabaseService = inject(SupabaseService);

  user: User;

  constructor() {
    this.user = this.#activatedRoute.snapshot.data['user'];
  }

  openAddDialog() {
    this.#dialog
      .open<TaskFormComponent, null, ListItemCreate>(TaskFormComponent, {
        panelClass: ['w-10/12', 'md:w-4/12'],
      })
      .afterClosed()
      .pipe(filter((x): x is Exclude<typeof x, undefined> => x != null))
      .subscribe(async (task) => {
        await this.#supabaseService.addTask(this.user.uid as UserId, task);
      });
  }
}
