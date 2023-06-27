import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarTheme } from '../../shared/models/snackbar.model';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar, private zone: NgZone) {}

  openSnackBar(message: string, theme: SnackBarTheme) {
    this.zone.run(() => {
      const snackBar = this._snackBar.open(message, 'Cerrar', {
        panelClass: theme,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      });
    });
  }
}
