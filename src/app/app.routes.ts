import { Routes } from '@angular/router';

import { LoginComponent } from './perfil/login/login.component';
import { MessengerComponent } from './messenger/messenger.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MessengerComponent },
];
