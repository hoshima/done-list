import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListItem } from '../../interfaces/list-item';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class FormComponent {
  @Output() add = new EventEmitter<
    Pick<ListItem, 'name' | 'date' | 'description'>
  >();

  name = '';
  date = new Date();
  description = '';

  addTask() {
    this.add.emit({
      name: this.name,
      date: this.date,
      description: this.description,
    });
  }
}
