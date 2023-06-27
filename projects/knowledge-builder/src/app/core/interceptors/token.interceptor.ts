import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../modules/auth/auth.service';
import { Jwt } from '../../shared/models/auth/jwt.model';
import { LocalStorageKey } from '../../shared/models/auth/key.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getAccessToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    req = req.clone({
      withCredentials: true
    });
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const tokenHeader = event.headers.get('new-token');
          if (tokenHeader) {
            const tokenInfo: Jwt = JSON.parse(tokenHeader);
            if (!this.isSameAccessToken(tokenInfo.access_token)) {
              this.authService.saveToken(tokenInfo);
              this.authService.setUserProfile().subscribe();
            }
          }
        }
      })
    );
  }

  private isSameAccessToken(token: string): boolean {
    const actualTokenInfo = localStorage.getItem(LocalStorageKey.Token);
    if (!actualTokenInfo) return false;
    const actualToken = (JSON.parse(actualTokenInfo) as Jwt).access_token;
    return actualToken === token;
  }
}
