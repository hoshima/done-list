import { Component } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { FormComponent } from '../../components/form/form.component';
import { CreateListItem } from '../../interfaces/list-item';

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
  addTask(task: CreateListItem) {
    console.log(task);
  }
}
