import { Component, OnInit } from '@angular/core';
import { UserProfile } from './shared/models/auth/user-profile.model';
import { AuthService } from './modules/auth/auth.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userProfile?: UserProfile | null;
  isInitialRoute: boolean | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.initUserProfile();
    this.authService.userProfile$.subscribe((userProfile) => {
      this.userProfile = userProfile;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isInitialRoute = event.url.includes('inicio') || event.url === '/';
      }
    });
  }
}
