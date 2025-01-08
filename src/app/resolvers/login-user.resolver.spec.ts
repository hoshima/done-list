import { TestBed } from '@angular/core/testing';
import { RedirectCommand, ResolveFn } from '@angular/router';

import { loginUserResolver } from './login-user.resolver';
import { Session } from '@supabase/supabase-js';

describe('authResolver', () => {
  const executeResolver: ResolveFn<Session | RedirectCommand> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      loginUserResolver(...resolverParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
