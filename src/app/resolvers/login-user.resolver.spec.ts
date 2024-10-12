import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { loginUserResolver } from './login-user.resolver';

describe('authResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
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
