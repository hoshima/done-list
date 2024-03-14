import { createStore } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities,
} from '@ngneat/elf-entities';
import { ListItem } from '../interfaces/list-item';
import { Injectable } from '@angular/core';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';

export const store = createStore({ name: 'tasks' }, withEntities<ListItem>());

export const persist = persistState(store, {
  key: 'tasks',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class TasksRepository {
  tasks$ = store.pipe(selectAllEntities());

  setTasks(tasks: ListItem[]) {
    store.update(setEntities(tasks));
  }

  addTask(task: ListItem) {
    store.update(addEntities(task));
  }

  updateTask(id: ListItem['id'], task: Partial<ListItem>) {
    store.update(updateEntities(id, task));
  }

  deleteTask(id: ListItem['id']) {
    store.update(deleteEntities(id));
  }
}
