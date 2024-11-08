import { Routes } from '@angular/router';
import { loginUserResolver } from './resolvers/login-user.resolver';

export const routes: Routes = [
  {
    path: '',
    title: '',
    loadComponent: () => import('./pages/list-page/list-page.component'),
    resolve: { user: loginUserResolver },
  },
  {
    path: 'login',
    title: 'ログイン',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'sign-up',
    title: 'アカウント作成',
    loadComponent: () => import('./pages/sign-up/sign-up.component'),
  },
  {
    path: 'privacy',
    title: 'プライバシーポリシー',
    loadComponent: () => import('./pages/privacy/privacy.component'),
  },
];
