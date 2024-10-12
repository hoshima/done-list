import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './login.component.html',
  host: {
    class: 'block container mx-auto',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  #authService = inject(AuthService);
  #router = inject(Router);

  constructor() {
    this.#authService.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      if (user) {
        this.#router.navigateByUrl('');
      }
    });
  }

  async loginWithGoogle() {
    await this.#authService.login();
  }
}
