import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { Session } from '@supabase/supabase-js';

export const loginUserResolver: ResolveFn<Session | null | undefined> = async (
  route,
  state,
) => {
  const router = inject(Router);

  const user = await inject(SupabaseService).sessionAsync;
  if (user.data.session) {
    return user.data.session;
  } else {
    return new RedirectCommand(router.parseUrl('login'));
  }
};
