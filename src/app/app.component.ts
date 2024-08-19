import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { UiRepository } from './states/ui.repository';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  user,
} from '@angular/fire/auth';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatSidenavModule,
    MatMenuModule,
    MatDivider,
    SideMenuComponent,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { class: 'block h-svh' },
})
export class AppComponent {
  uiRepository = inject(UiRepository);

  title = 'done-list';

  drawerOpened$ = this.uiRepository.drawerOpened$;

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

  openDrawer() {
    this.uiRepository.openDrawer();
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
