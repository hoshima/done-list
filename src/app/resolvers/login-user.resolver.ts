import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';

export const loginUserResolver: ResolveFn<User | null | undefined> = (
  route,
  state,
) => {
  return inject(AuthService).user$;
};
