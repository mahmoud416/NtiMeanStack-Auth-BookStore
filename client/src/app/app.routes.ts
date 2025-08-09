import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'login', loadComponent: ()=> import('./pages/login/login.component')},
  { path: 'register', loadComponent: () => import('./pages/register/register.component') },
  { path: 'forget-password', loadComponent: () => import('./pages/forget-password/forget-password.component') },
  { path: 'home', loadComponent: () => import('./pages/home/home.component') },
  { path: 'reset/:token', loadComponent: () => import('./pages/reset/reset.component') },
  { path: 'cart', loadComponent: () => import('./pages/cart/cart.component') },
  { path: 'admin', loadComponent: () => import('./pages/admin/admin.component') },
  { path: 'add-book', loadComponent: () => import('./pages/add-book/add-book.component').then(c => c.AddBookComponent) },
{ path: 'users', loadComponent: () => import('./pages/users/users.component').then(c => c.UsersComponent) },
{ path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(c => c.ProfileComponent) }
];
