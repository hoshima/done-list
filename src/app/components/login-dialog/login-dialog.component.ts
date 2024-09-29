import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, NgOptimizedImage],
  templateUrl: './login-dialog.component.html',
  styles: ``,
})
export class LoginDialogComponent {
  #dialogRef = inject(MatDialogRef<LoginDialogComponent>);
  #authService = inject(AuthService);

  async loginWithGoogle() {
    const userCred = await this.#authService.login();
    if (userCred) {
      this.#dialogRef.close();
    }
  }
}
