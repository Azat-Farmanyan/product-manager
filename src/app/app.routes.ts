import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';
import { ProductsComponent } from './components/products/products.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: '**', component: PageNotFoundComponent },
];
