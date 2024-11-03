import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { UserId } from '../types/branded.type';

@Injectable({
  providedIn: 'root',
})
export class ExternalFileService {
  readonly #supabaseService = inject(SupabaseService);

  /**
   * タスクをjsonとしてエクスポートする
   */
  async exportTasksToJson(userId: UserId) {
    const tasks = (await this.#supabaseService.tasks(userId)).data;
    const jsonString = JSON.stringify(tasks, undefined, 2);

    const a = document.createElement('a');
    const file = new Blob([jsonString], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'tasks.json';
    a.click();
    a.remove();
  }
}
