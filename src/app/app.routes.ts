import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];
