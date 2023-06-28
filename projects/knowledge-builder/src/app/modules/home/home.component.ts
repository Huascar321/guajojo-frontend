import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DashboardData } from '../../shared/models/menu/dashboard.model';
import { Subscription } from 'rxjs';
import { MenuService } from '../../core/components/menu/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelData } from '../../shared/models/menu/menu.model';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() data?: DashboardData[];
  isInitialRoute?: boolean;
  private navigatorSubscription?: Subscription;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isInitialRoute = this.router.url === '/inicio';
    this.navigatorSubscription = this.menuService.navigator.subscribe(
      (routerLink) => {
        this.router
          .navigate([routerLink], { relativeTo: this.route })
          .then(() => {
            this.isInitialRoute = this.router.url === '/inicio';
          });
      }
    );
    this.menuService.dataSender$.next({
      panels: [this.knowledgePanel]
    });
  }

  ngOnDestroy(): void {
    if (this.navigatorSubscription) this.navigatorSubscription.unsubscribe();
  }

  get knowledgePanel(): PanelData {
    return {
      title: 'Conocimiento',
      icon: 'library_books',
      canActivate: true,
      items: [
        {
          title: 'Propósitos',
          routerLink: 'propositos',
          canActivate: true
        },
        {
          title: 'Sustantivos',
          routerLink: 'sustantivos',
          canActivate: true
        },
        {
          title: 'Respuestas',
          routerLink: 'respuestas',
          canActivate: true
        },
        {
          title: 'Diálogos',
          routerLink: 'dialogos',
          canActivate: true
        },
        {
          title: 'Documentos',
          routerLink: 'documentos',
          canActivate: true
        }
      ]
    };
  }
}
