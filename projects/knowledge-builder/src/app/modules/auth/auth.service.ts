import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserProfile } from '../../shared/models/auth/user-profile.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SnackBarService } from '../../core/services/snackbar.service';
import { LocalStorageKey } from '../../shared/models/auth/key.model';
import { User } from '@shared/index';
import { Jwt } from '../../shared/models/auth/jwt.model';
import { SnackBarTheme } from '../../shared/models/snackbar.model';
import * as dayjs from 'dayjs';
import { parseTimeToSeconds } from '../../shared/helpers/parser.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl: string;
  userProfile$ = new BehaviorSubject<UserProfile | null>(null);

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService,
    private router: Router
  ) {
    this.apiUrl = environment.backendApiUrl;
  }

  initUserProfile(): void {
    const localStorageUserProfile = localStorage.getItem(
      LocalStorageKey.UserProfile
    );
    if (localStorageUserProfile) {
      const userProfile = JSON.parse(localStorageUserProfile) as UserProfile;
      this.userProfile$.next(userProfile);
    } else {
      this.setUserProfile().subscribe();
    }
  }

  login(data: Omit<User, 'userId'>): void {
    this.http
      .post<Jwt>(this.apiUrl + '/auth/login', data)
      .subscribe((accessTokenInfo) => {
        this.saveToken(accessTokenInfo);
        this.setUserProfile().subscribe(() => {
          this.router.navigate(['/inicio']).then(() => {
            this.snackBarService.openSnackBar(
              'Has iniciado sesión correctamente',
              SnackBarTheme.Success
            );
          });
        });
      });
  }

  refresh(): void {
    this.http
      .get<Jwt>(this.apiUrl + '/auth/refresh')
      .subscribe((accessTokenInfo) => {
        this.saveToken(accessTokenInfo);
        this.setUserProfile().subscribe();
      });
  }

  logout(): void {
    this.http.get<null>(this.apiUrl + '/auth/logout').subscribe(() => {
      localStorage.removeItem(LocalStorageKey.Token);
      localStorage.removeItem(LocalStorageKey.UserProfile);
      this.userProfile$.next(null);
      this.router.navigate(['/autenticarse']).then(() => {
        this.snackBarService.openSnackBar(
          'Has cerrado la sesión con éxito',
          SnackBarTheme.Success
        );
      });
    });
  }

  setUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.apiUrl + '/auth/profile').pipe(
      tap((userProfile) => {
        this.userProfile$.next(userProfile);
        localStorage.setItem(
          LocalStorageKey.UserProfile,
          JSON.stringify(userProfile)
        );
      })
    );
  }

  getAccessToken(): string | null {
    const item = localStorage.getItem(LocalStorageKey.Token);
    if (!item) return null;
    const token = JSON.parse(item);
    const expiresAt = dayjs(token.expires_at);
    if (dayjs().isAfter(expiresAt)) {
      localStorage.removeItem(LocalStorageKey.Token);
      localStorage.removeItem(LocalStorageKey.UserProfile);
      return null;
    }
    return token.access_token;
  }

  saveToken(token: Jwt): void {
    const expiresInSeconds = parseTimeToSeconds(token.access_token_expires_in);
    const expiresAt = dayjs().add(expiresInSeconds, 'second');
    localStorage.setItem(
      LocalStorageKey.Token,
      JSON.stringify({
        access_token: token.access_token,
        expires_at: expiresAt.toISOString()
      })
    );
  }
}
