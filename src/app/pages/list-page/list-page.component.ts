import { Component } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { FormComponent } from '../../components/form/form.component';
import { CreateListItem, ListItem } from '../../interfaces/list-item';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [ListComponent, FormComponent],
  templateUrl: './list-page.component.html',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'block container mx-auto',
  },
})
export default class ListPageComponent {
  list: ListItem[] = [];

  constructor() {
    const list = localStorage.getItem('list');
    if (list) {
      this.list = JSON.parse(list);
    }
  }

  addTask(task: CreateListItem) {
    this.list.push({
      id: crypto.randomUUID(),
      ...task,
    });

    localStorage.setItem('list', JSON.stringify(this.list));
  }

  onDeleteItem(id: string) {
    this.list = this.list.filter((x) => x.id !== id);

    localStorage.setItem('list', JSON.stringify(this.list));
  }
}
