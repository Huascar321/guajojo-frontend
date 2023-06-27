import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() username?: string;
  @Output() logoutEmitter = new EventEmitter<true>();

  logout(): void {
    this.logoutEmitter.emit(true);
  }
}
