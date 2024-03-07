import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateListItem } from '../../interfaces/list-item';
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
  templateUrl: './form.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class FormComponent {
  dialogRef = inject(MatDialogRef<FormComponent>);

  @Output() add = new EventEmitter<CreateListItem>();

  name = '';
  date = cdate().format('YYYY-MM-DD');
  description = '';

  clickAddButton() {
    this.dialogRef.close({
      name: this.name,
      date: this.date,
      description: this.description,
    });
  }
}
