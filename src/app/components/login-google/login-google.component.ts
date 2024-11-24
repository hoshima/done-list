import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  CredentialResponse,
  SupabaseService,
} from '../../services/supabase.service';
import { Router } from '@angular/router';

declare global {
  interface Window {
    handleSignInWithGoogle: (response: CredentialResponse) => void;
  }
}

@Component({
  selector: 'app-login-google',
  imports: [],
  templateUrl: './login-google.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginGoogleComponent implements OnInit {
  readonly #supabase = inject(SupabaseService);
  readonly #router = inject(Router);

  ngOnInit() {
    // googleログインクライアント生成
    const body = document.body;
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    body.appendChild(script);

    // コールバックをバインド
    window.handleSignInWithGoogle = this.onGoogleSignIn.bind(this);
  }

  async onGoogleSignIn(res: CredentialResponse) {
    try {
      const { error } = await this.#supabase.signInWithGoogle(res);
      if (error) {
        throw error;
      }

      await this.#router.navigateByUrl('/');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }
}
