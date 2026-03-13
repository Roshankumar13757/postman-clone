import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardComponent }, // default child route
      { path: 'history', component: DashboardComponent },
      { path: 'playlists', component: DashboardComponent },
      { path: 'watch-later', component: DashboardComponent },
      { path: 'liked', component: DashboardComponent },
      { path: 'your-videos', component: DashboardComponent },
      { path: 'trending', component: DashboardComponent },
      { path: 'subscriptions', component: DashboardComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];