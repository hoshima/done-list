import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { UiRepository } from './states/ui.repository';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  user,
} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatSidenavModule,
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

  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
    });
  }

  openDrawer() {
    this.uiRepository.openDrawer();
  }

  async login() {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(this.auth, provider);
    console.log(cred);

    // await this.router.navigate(this.redirect);
  }
}
