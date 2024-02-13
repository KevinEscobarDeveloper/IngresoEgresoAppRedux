import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let estado: any;

  return authService.isAuth().pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return true;
      }
      else {
        return false;
      }
    })
  );
  
};
