import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { SupabaseService } from '../../services/supabase.service';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  host: {
    class: 'block container mx-auto',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  readonly #supabaseService = inject(SupabaseService);
  readonly #fb = inject(NonNullableFormBuilder);
  readonly #router = inject(Router);
  loading = false;

  readonly form = this.#fb.group({
    email: this.#fb.control('', [Validators.required, Validators.email]),
    password: this.#fb.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  hidePassword = signal(true);

  constructor() {
    merge(
      this.form.controls['email'].statusChanges,
      this.form.controls['email'].valueChanges,
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(
      this.form.controls['password'].statusChanges,
      this.form.controls['password'].valueChanges,
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  updateEmailErrorMessage() {
    if (this.form.controls['email'].hasError('required')) {
      this.emailErrorMessage.set('メールアドレスを入力してください');
    } else if (this.form.controls['email'].hasError('email')) {
      this.emailErrorMessage.set('不正なメールアドレスです');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    if (this.form.controls['password'].hasError('required')) {
      this.passwordErrorMessage.set('パスワードを入力してください');
    } else if (this.form.controls['password'].hasError('minlength')) {
      this.passwordErrorMessage.set('パスワードは8文字以上で入力してください');
    } else {
      this.passwordErrorMessage.set('');
    }
  }

  clickHidePassword(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const formValue = this.form.getRawValue();
      if (this.form.invalid) {
        return;
      }

      const { error } = await this.#supabaseService.signIn(formValue);
      if (error) throw error;

      this.#router.navigateByUrl('/');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.form.reset();
      this.loading = false;
    }
  }
}
