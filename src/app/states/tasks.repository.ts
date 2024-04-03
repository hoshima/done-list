import { createStore } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities,
  getEntity,
  getAllEntities,
} from '@ngneat/elf-entities';
import { ListItem } from '../interfaces/list-item';
import { Injectable } from '@angular/core';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { map } from 'rxjs';
import orderBy from 'just-order-by';

export const store = createStore({ name: 'tasks' }, withEntities<ListItem>());

export const persist = persistState(store, {
  key: 'tasks',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class TasksRepository {
  tasks$ = store.pipe(
    selectAllEntities(),
    map((x) =>
      orderBy(x, [
        {
          property: 'date',
          order: 'desc',
        },
        {
          property: 'name',
          order: 'asc',
        },
      ]),
    ),
  );

  getAllTasks() {
    return store.query(getAllEntities());
  }

  getTask(id: string) {
    return store.query(getEntity(id));
  }

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
