import { Routes } from '@angular/router';
import { loginUserResolver } from './resolvers/login-user.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/list-page/list-page.component'),
    resolve: { user: loginUserResolver },
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
];
