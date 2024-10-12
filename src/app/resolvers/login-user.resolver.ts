import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

export const loginUserResolver: ResolveFn<User | null | undefined> = async (
  route,
  state,
) => {
  const router = inject(Router);

  const user = await firstValueFrom(inject(AuthService).user$);
  if (user) {
    return user;
  } else {
    return new RedirectCommand(router.parseUrl('login'));
  }
};
