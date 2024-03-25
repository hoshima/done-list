import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatActionList, MatListItem } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UiRepository } from '../../states/ui.repository';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIcon,
    MatIconButton,
    MatActionList,
    MatListItem,
  ],
  templateUrl: './side-menu.component.html',
  styles: ``,
})
export class SideMenuComponent {
  uiRepository = inject(UiRepository);

  closeDrawer() {
    this.uiRepository.closeDrawer();
  }
}
