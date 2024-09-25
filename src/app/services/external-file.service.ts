import { Injectable, inject } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ExternalFileService {
  readonly #firestoreService = inject(FirestoreService);

  /**
   * タスクをjsonとしてエクスポートする
   */
  async exportTasksToJson() {
    const tasks = await this.#firestoreService.getAllTasks();
    const jsonString = JSON.stringify(tasks, undefined, 2);

    const a = document.createElement('a');
    const file = new Blob([jsonString], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'tasks.json';
    a.click();
    a.remove();
  }
}
