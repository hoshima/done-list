import { Component, input, output } from '@angular/core';
import { ListItem } from '../../interfaces/list-item';
import { DatePipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Task } from '../../types/task.type';

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
  list = input.required<ListItem[] | Task[]>();

  editItem = output<string>();
  deleteItem = output<string>();

  clickEditItem(id: string) {
    this.editItem.emit(id);
  }

  clickDeleteItem(id: string) {
    this.deleteItem.emit(id);
  }
}
