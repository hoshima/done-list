import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthComponent } from '../../components/auth/auth.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './login.component.html',
  host: {
    class: 'block container mx-auto',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {}
