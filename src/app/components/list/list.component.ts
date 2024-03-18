import { Component, EventEmitter, Output, input, output } from '@angular/core';
import { ListItem } from '../../interfaces/list-item';
import { DatePipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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
  list = input.required<ListItem[]>();

  editItem = output<string>();
  @Output() deleteItem = new EventEmitter<string>();

  clickEditItem(id: string) {
    this.editItem.emit(id);
  }

  clickDeleteItem(id: string) {
    this.deleteItem.emit(id);
  }
}
