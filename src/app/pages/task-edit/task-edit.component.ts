import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { TaskId } from '../../types/branded.type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, MatFormField, MatInput, MatLabel, MatButton, MatError],
  templateUrl: './task-edit.component.html',
  host: {
    class: 'block container mx-auto',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaskEditComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #snackBar = inject(MatSnackBar);
  readonly #supabase = inject(SupabaseService);

  id!: TaskId;

  title = model<string>();
  date = model<string>();
  description = model<string>();

  constructor() {
    this.id = this.#route.snapshot.params['id'];
  }

  async ngOnInit(): Promise<void> {
    const { data } = await this.#supabase.getTask(this.id);
    if (data) {
      this.title.set(data.name ?? '');
      this.date.set(data.date ?? '');
      this.description.set(data.description ?? '');
    }
  }

  async clickEditButton() {
    await this.#supabase.updateTask(this.id, {
      id: this.id,
      name: this.title(),
      date: this.date(),
      description: this.description(),
    });

    await this.#router.navigateByUrl('');
  }

  async clickDeleteButton() {
    if (!confirm(`${this.title()}を削除しますか？`)) {
      return;
    }

    await this.#supabase.deleteTask(this.id);

    this.#snackBar.open(`${this.title()}を削除しました`);
    await this.#router.navigateByUrl('');
  }

  async clickCancelButton() {
    await this.#router.navigateByUrl('');
  }
}
