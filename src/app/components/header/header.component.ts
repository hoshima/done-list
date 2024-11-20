import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { UiRepository } from '../../states/ui.repository';
import { MatIconButton } from '@angular/material/button';
import { SupabaseService } from '../../services/supabase.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatToolbar,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatIcon,
    MatIconButton,
    MatDivider,
  ],
  templateUrl: './header.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  uiRepository = inject(UiRepository);
  supabaseService = inject(SupabaseService);
  router = inject(Router);

  sessionSignal = this.supabaseService.sessionSignal;

  openDrawer() {
    this.uiRepository.openDrawer();
  }

  async logout() {
    await this.supabaseService.signOut();
    alert('ログアウトしました');

    await this.router.navigateByUrl('/login');
  }
}
