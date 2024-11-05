import { ApplicationConfig, Injectable, isDevMode } from '@angular/core';
import {
  provideRouter,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Title } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  appTitle = 'Done List';

  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title) {
      this.title.setTitle(`${title} | ${this.appTitle}`);
    } else {
      this.title.setTitle(`${this.appTitle}`);
    }
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
