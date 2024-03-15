import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'done-list-58de5',
          appId: '1:404826449834:web:1c6ba0e8d00c17a7592dd3',
          storageBucket: 'done-list-58de5.appspot.com',
          apiKey: 'AIzaSyBsBqqbfqZrhlBT8rhb24ym4gp4oerFDy8',
          authDomain: 'done-list-58de5.firebaseapp.com',
          messagingSenderId: '404826449834',
          measurementId: 'G-S8YSBN32F5',
        }),
      ),
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
  ],
};
