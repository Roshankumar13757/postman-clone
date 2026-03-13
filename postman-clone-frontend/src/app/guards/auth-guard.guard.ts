import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  // check if both token and user exist
  if (token && user) {
    return true;
  }

  // if not logged in redirect to login
  router.navigate(['/login']);
  return false;
};