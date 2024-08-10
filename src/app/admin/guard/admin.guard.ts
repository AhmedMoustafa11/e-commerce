import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../../shared/service/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(SharedService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  if (authService.isAdminLogged) {
    return true;
  } else {
    snackBar.open('You must login first', 'Close', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
    router.navigate(['/user/login']);
    return false;
  }
};








