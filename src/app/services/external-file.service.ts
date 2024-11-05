import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ExternalFileService {
  readonly #supabaseService = inject(SupabaseService);

  /**
   * タスクをjsonとしてエクスポートする
   */
  async exportTasksToJson() {
    const tasks = await this.#supabaseService.fetchTasks();

    if (!tasks) {
      return;
    }
    const jsonString = JSON.stringify(tasks, undefined, 2);

    const a = document.createElement('a');
    const file = new Blob([jsonString], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'tasks.json';
    a.click();
    a.remove();
  }
}
