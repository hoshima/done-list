import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { Task, TaskCreate } from '../../types/task.type';

@Component({
  selector: 'app-form',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  data = inject<Task>(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef<TaskFormComponent>);

  add = output<TaskCreate>();

  title = model<string>();
  date = model<string>(cdate().format('YYYY-MM-DD'));
  description = model<string>();

  constructor() {
    if (this.data) {
      this.title.set(this.data.name);
      this.date.set(this.data.date);
      this.description.set(this.data.description);
    }
  }

  clickAddButton() {
    this.dialogRef.close({
      name: this.title(),
      date: this.date(),
      description: this.description(),
    });
  }
}
