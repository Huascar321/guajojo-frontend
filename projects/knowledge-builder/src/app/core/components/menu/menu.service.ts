import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuData } from '../../../shared/models/menu/menu.model';
import { AuthService } from '../../../modules/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  dataSender$ = new Subject<MenuData>();
  navigator = new Subject<string>();

  constructor(private authService: AuthService) {}
}
