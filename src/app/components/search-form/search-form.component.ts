import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SupabaseService } from '../../services/supabase.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [MatFormField, MatInputModule, FormsModule, MatIcon],
  templateUrl: './search-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  readonly #supabaseService = inject(SupabaseService);

  searchValue = signal('');
  fetchTasksOnSearch = effect(() => {
    this.#supabaseService.fetchTasks(this.searchValue());
  });
}
