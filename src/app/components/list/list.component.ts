import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../../types/task.type';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    DatePipe,
    MatCard,
    MatCardContent,
    MatIconButton,
    MatIcon,
    AsyncPipe,
  ],
  templateUrl: './list.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  readonly #firestoreService = inject(FirestoreService);
  readonly #activatedRoute = inject(ActivatedRoute);

  tasks: Observable<Task[]> | null = null;

  constructor() {
    const user: User = this.#activatedRoute.snapshot.data['user'];
    this.tasks = this.#firestoreService.tasks(user.uid);
  }

  editItem = output<string>();
  deleteItem = output<[string, string]>();

  clickEditItem(id: string) {
    this.editItem.emit(id);
  }

  clickDeleteItem(id: string, name: string) {
    this.deleteItem.emit([id, name]);
  }
}
