import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { UserProfile } from '../../../shared/models/auth/user-profile.model';
import { MenuData } from '../../../shared/models/menu/menu.model';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { GeneralService } from '../../services/general.service';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() userProfile?: UserProfile;
  @Input() isInitialRoute: boolean | undefined;
  data?: MenuData;
  private menuDataSubscription?: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private generalService: GeneralService,
    private menuService: MenuService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.menuDataSubscription = this.menuService.dataSender$.subscribe(
      (data) => {
        console.log('data: ', data);
        this.setDefaultSystemData(data);
      }
    );
  }

  logout(): void {
    this.generalService.logout();
  }

  ngOnDestroy(): void {
    if (this.menuDataSubscription) this.menuDataSubscription.unsubscribe();
  }

  private setDefaultSystemData(data: MenuData) {
    this.data = data;
    this.data?.panels.push({
      title: 'Sistema',
      icon: 'tune',
      canActivate: false,
      items: [
        {
          title: 'Cerrar Sesión',
          routerLink: 'logout',
          canActivate: true
        }
      ]
    });
    this.ref.detectChanges();
  }
}
