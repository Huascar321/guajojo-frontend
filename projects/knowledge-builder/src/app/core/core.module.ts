import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/menu/navbar/navbar.component';
import { PanelComponent } from './components/menu/panel/panel.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';

const components = [
  MenuComponent,
  NavbarComponent,
  PanelComponent,
  HomeComponent
];
@NgModule({
  imports: [
    HttpClientModule,
    SharedModule,
    RouterLinkActive,
    RouterLink,
    RouterOutlet
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ],
  declarations: components,
  exports: components
})
export class CoreModule {}
