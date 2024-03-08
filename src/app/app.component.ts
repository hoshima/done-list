import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIcon, MatIconButton, MatToolbar],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'done-list';
}
