import { Component, input } from '@angular/core';
import { ListItem } from '../../interfaces/list-item';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './list.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ListComponent {
  list = input.required<ListItem[]>();
}
