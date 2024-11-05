import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { Session } from '@supabase/supabase-js';

export const loginUserResolver: ResolveFn<
  Session | null | undefined
> = async () => {
  const router = inject(Router);

  const session = inject(SupabaseService).sessionSignal();
  if (session) {
    // ログイン済み
    return session;
  } else {
    // ログイン済み、再読み込み後
    const session = await inject(SupabaseService).getSession();
    if (session) {
      return session;
    }
    return new RedirectCommand(router.parseUrl('login'));
  }
};
