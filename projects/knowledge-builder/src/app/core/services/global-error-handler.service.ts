import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { translateHttpMessage } from '../../shared/helpers/translator.helper';
import { SnackBarTheme } from '../../shared/models/snackbar.model';
import { SnackBarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  isFirstError? = true;

  constructor(private snackBarService: SnackBarService) {}

  handleError(error: HttpErrorResponse): void {
    if (!this.isFirstError) {
      console.error(error);
      let message: string;
      if (error.error) {
        message = translateHttpMessage(error.error.message);
      } else {
        message = error.message ? error.message : 'Ha ocurrido un error';
      }
      this.snackBarService.openSnackBar(message, SnackBarTheme.Error);
    } else {
      this.isFirstError = false;
    }
  }
}
