import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, map, shareReplay } from 'rxjs';
import { PanelData } from '../../../../shared/models/menu/menu.model';
import { GeneralService } from '../../../services/general.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Input() sidenav?: MatSidenav;
  @Input()
  set data(value: PanelData | undefined) {
    if (value) {
      this._data = value;
      this._data.items.forEach(() => {
        this._data!.canActivate = this.canPanelBeActivated();
      });
    }
  }
  _data?: PanelData;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private generalService: GeneralService,
    private menuService: MenuService
  ) {}

  exCloseSidenav(): void {
    this.isHandset$.subscribe((isHandset) => {
      if (isHandset) this.sidenav?.close();
    });
  }

  navigate(routerLink: string): void {
    routerLink === 'logout'
      ? this.logout()
      : this.menuService.navigator.next(routerLink);
  }

  logout(): void {
    this.generalService.logout();
  }

  private canPanelBeActivated(): boolean {
    if (this._data) return this._data.items.some((item) => item.canActivate);
    return false;
  }
}
