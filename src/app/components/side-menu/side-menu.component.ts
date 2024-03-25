import { Component } from '@angular/core';
import { MatActionList, MatListItem } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [MatToolbarModule, MatActionList, MatListItem],
  templateUrl: './side-menu.component.html',
  styles: ``,
})
export class SideMenuComponent {}
