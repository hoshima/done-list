import { Injectable, inject } from '@angular/core';
import { TasksRepository } from '../states/tasks.repository';

@Injectable({
  providedIn: 'root',
})
export class ExternalFileService {
  #tasksRepository = inject(TasksRepository);

  /**
   * タスクをjsonとしてエクスポートする
   */
  exportTasksToJson() {
    const tasks = this.#tasksRepository.getAllTasks();
    const jsonString = JSON.stringify(tasks, undefined, 2);

    const a = document.createElement('a');
    const file = new Blob([jsonString], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'tasks.json';
    a.click();
    a.remove();
  }
}
