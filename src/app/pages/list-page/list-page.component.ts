import { Component } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { FormComponent } from '../../components/form/form.component';
import { CreateListItem, ListItem } from '../../interfaces/list-item';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [ListComponent, FormComponent],
  templateUrl: './list-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class ListPageComponent {
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

  addTask(task: CreateListItem) {
    console.log(task);
  }
}
