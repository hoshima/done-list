import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { UiRepository } from '../../states/ui.repository';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatIcon,
    MatIconButton,
    MatDivider,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  uiRepository = inject(UiRepository);
  authService = inject(AuthService);

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
