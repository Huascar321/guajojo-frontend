import { Injectable } from '@angular/core';
import { AuthService } from '../../modules/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { DialogData } from '../../shared/models/dialog/dialog.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  constructor(private authService: AuthService, private dialog: MatDialog) {}

  logout(): void {
    const dialogData: DialogData = {
      icon: 'logout',
      title: 'CONFIRME SU DECISIÓN',
      content: '¿Estás seguro de que quieres cerrar sesión?',
      mainButton: {
        color: 'accent',
        title: 'Confirmar'
      }
    };
    const dialogRef = this.dialog.open(DialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.authService.logout();
    });
  }
}
