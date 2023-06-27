import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userProfile$.pipe(
    map((userProfile) => {
      if (!userProfile) router.navigate(['/autenticarse']);
      return !!userProfile;
    }),
    catchError(() => of(false))
  );
};
