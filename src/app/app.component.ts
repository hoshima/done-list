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
import { MatDivider } from '@angular/material/divider';
import { AuthService } from './services/auth.service';

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
  authService = inject(AuthService);

  title = 'done-list';

  drawerOpened$ = this.uiRepository.drawerOpened$;
  user$ = this.authService.user$;

  openDrawer() {
    this.uiRepository.openDrawer();
  }

  async login() {
    this.authService.login();
  }

  async logout() {
    this.authService.logout();
  }
}
