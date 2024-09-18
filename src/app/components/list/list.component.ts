import { Component, inject, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe, MatCard, MatCardContent, MatIconButton, MatIcon],
  templateUrl: './list.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ListComponent {
  readonly #firestoreService = inject(FirestoreService);

  tasks = this.#firestoreService.tasks;

  editItem = output<string>();
  deleteItem = output<[string, string]>();

  clickEditItem(id: string) {
    this.editItem.emit(id);
  }

  clickDeleteItem(id: string, name: string) {
    this.deleteItem.emit([id, name]);
  }
}
