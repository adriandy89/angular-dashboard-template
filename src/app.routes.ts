import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { authGuard } from './app/guards/auth.guard';
import { dashboardGuard } from './app/guards/dashboard.guard';
import { AuthLayout } from './app/layout/component/app.authlayout';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    canActivate: [dashboardGuard],
    children: [
      { path: '', component: Dashboard },
      {
        path: 'uikit',
        loadChildren: () => import('./app/pages/uikit/uikit.routes'),
      },
      { path: 'documentation', component: Documentation },
      { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
    ],
  },
  { path: 'landing', component: Landing, canActivate: [dashboardGuard] },
  { path: 'notfound', component: Notfound, canActivate: [dashboardGuard] },
  {
    path: 'auth',
    component: AuthLayout,
    loadChildren: () => import('./app/pages/auth/auth.routes'),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/notfound' },
];
