import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { UiRepository } from './states/ui.repository';
import { AsyncPipe } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    SideMenuComponent,
    AsyncPipe,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { class: 'block h-svh' },
})
export class AppComponent implements OnInit {
  uiRepository = inject(UiRepository);
  authService = inject(AuthService);

  drawerOpened$ = this.uiRepository.drawerOpened$;

  async ngOnInit(): Promise<void> {
    setTimeout(async () => {
      const isLoggedIn = await this.authService.isLoggedIn();
      if (!isLoggedIn) {
        alert('ログインしてください');
      }
    }, 1000);
  }
}
