import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.user$
      .pipe(takeUntilDestroyed())
      .subscribe((aUser: User | null) => {
        //handle user state changes here. Note, that user will be null if there is no currently logged in user.
        console.log(aUser);
      });
  }

  gerUser() {
    return this.auth.currentUser;
  }

  async login() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
    console.log(this.auth);
  }

  async logout() {
    await signOut(this.auth);
    this.userSubscription.unsubscribe();
  }
}
