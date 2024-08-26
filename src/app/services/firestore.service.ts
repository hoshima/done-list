import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  Firestore,
} from '@angular/fire/firestore';
import { Task } from '../types/task.type';
import { CreateListItem } from '../interfaces/list-item';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  readonly #firestore = inject(Firestore);
  readonly #authService = inject(AuthService);
  tasksCollection: CollectionReference = collection(this.#firestore, 'tasks');

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
