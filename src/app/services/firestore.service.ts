import { effect, inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { Task } from '../types/task.type';
import { CreateListItem } from '../interfaces/list-item';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  readonly #firestore = inject(Firestore);
  readonly #authService = inject(AuthService);
  tasksCollection: CollectionReference = collection(this.#firestore, 'tasks');
  tasks = signal<Task[]>([]);

  constructor() {
    effect(() => {
      const user = this.#authService.user();
      if (!user) return;

      (
        collectionData(
          query(this.tasksCollection, where('uid', '==', user.uid ?? '')),
        ) as Observable<Task[]>
      ).subscribe((x) => {
        this.tasks.set(x);
      });
    });
  }

  async addTask(task: CreateListItem) {
    const user = this.#authService.gerUser();
    if (!user) return;

    await addDoc(this.tasksCollection, <Task>{
      uid: user.uid,
      name: task.name,
      date: task.date,
      description: task.description,
    });
  }
}
