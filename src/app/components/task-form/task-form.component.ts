import { Component, EventEmitter, Inject, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateListItem, ListItem } from '../../interfaces/list-item';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { cdate } from 'cdate';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatError,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './task-form.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class TaskFormComponent {
  dialogRef = inject(MatDialogRef<TaskFormComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: ListItem) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.date = data.date;
      this.description = data.description;
    }
  }

  @Output() add = new EventEmitter<CreateListItem>();

  id = '';
  name = '';
  date = cdate().format('YYYY-MM-DD');
  description = '';

  clickEditButton() {
    this.dialogRef.close({
      id: this.id,
      name: this.name,
      date: this.date,
      description: this.description,
    });
  }

  clickAddButton() {
    this.dialogRef.close({
      name: this.name,
      date: this.date,
      description: this.description,
    });
  }
}
