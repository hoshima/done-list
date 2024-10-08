import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { UiRepository } from './states/ui.repository';
import { AsyncPipe } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { delay } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  #destroyRef = inject(DestroyRef);
  #dialog = inject(MatDialog);
  uiRepository = inject(UiRepository);
  authService = inject(AuthService);

  drawerOpened$ = this.uiRepository.drawerOpened$;

  ngOnInit(): void {
    this.authService.user$
      .pipe(takeUntilDestroyed(this.#destroyRef), delay(1000))
      .subscribe((user) => {
        if (!user) {
          this.#dialog.open(LoginDialogComponent);
        }
      });
  }
}
