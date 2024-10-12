import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Task, TaskCreate } from '../types/task.type';
import { CreateListItem, ListItem } from '../interfaces/list-item';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  readonly #firestore = inject(Firestore);
  readonly #authService = inject(AuthService);

  tasksCollection: CollectionReference = collection(this.#firestore, 'tasks');

  tasks(uid: string) {
    return collectionData(
      query(
        this.tasksCollection,
        where('uid', '==', uid ?? ''),
        orderBy('date', 'desc'),
      ),
      { idField: 'id' },
    ) as Observable<Task[]>;
  }

  async getTaskData(id: string) {
    const taskRef = doc(this.#firestore, 'tasks', id);
    const taskSnap = await getDoc(taskRef);

    return { ...taskSnap.data(), id } as Task;
  }

  async getAllTasks() {
    const user = this.#authService.user();
    if (!user) return;

    const q = query(
      this.tasksCollection,
      where('uid', '==', user.uid ?? ''),
      orderBy('date', 'desc'),
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((x) => {
      const data = x.data() as Task;
      return {
        date: data.date,
        description: data.description,
        name: data.name,
      };
    });
  }

  async addTask(uid: string, task: CreateListItem) {
    await addDoc(this.tasksCollection, {
      uid: uid,
      name: task.name,
      date: task.date,
      description: task.description ?? '',
    } satisfies TaskCreate);
  }

  async deleteTask(id: string) {
    const task = doc(this.#firestore, 'tasks', id);

    await deleteDoc(task);
  }

  async updateTask(id: string, task: ListItem) {
    const target = doc(this.#firestore, 'tasks', id);

    await updateDoc(target, {
      name: task.name,
      date: task.date,
      description: task.description ?? '',
    });
  }
}
