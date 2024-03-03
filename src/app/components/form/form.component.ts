import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateListItem } from '../../interfaces/list-item';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, MatFormField, MatInput, MatLabel, MatButton],
  templateUrl: './form.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class FormComponent {
  @Output() add = new EventEmitter<CreateListItem>();

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
