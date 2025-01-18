import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authToken = localStorage.getItem('auth_token');

  if (authToken) {
    // If token exists, allow navigation
    return true;
  } else {
    // If token doesn't exist, redirect to login page
    router.navigate(['/login']);
    return false;
  }
};
