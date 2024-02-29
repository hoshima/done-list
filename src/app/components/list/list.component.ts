import { Component } from '@angular/core';
import { ListItem } from '../../interfaces/list-item';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './list.component.html',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'block container mx-auto',
  },
})
export class ListComponent {
  list: ListItem[] = [
    {
      id: crypto.randomUUID(),
      name: 'sample name',
      description: 'sample description',
      date: new Date(),
    },
    {
      id: crypto.randomUUID(),
      name: 'sample name2',
      description: 'sample description2',
      date: new Date(),
    },
  ];
}
