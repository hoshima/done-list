import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatActionList, MatListItem } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UiRepository } from '../../states/ui.repository';
import { ExternalFileService } from '../../services/external-file.service';
import { SupabaseService } from '../../services/supabase.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [
    MatToolbarModule,
    MatIcon,
    MatIconButton,
    MatActionList,
    MatListItem,
    RouterLink,
  ],
  templateUrl: './side-menu.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  uiRepository = inject(UiRepository);
  externalFileService = inject(ExternalFileService);
  #supabaseService = inject(SupabaseService);

  sessionSignal = this.#supabaseService.sessionSignal;

  closeDrawer() {
    this.uiRepository.closeDrawer();
  }

  async onExport() {
    await this.externalFileService.exportTasksToJson();
  }

  clickPrivacy() {
    this.uiRepository.closeDrawer();
  }
}
