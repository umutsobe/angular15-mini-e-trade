import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <app-categories></app-categories>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      * {
        text-decoration: none;
        list-style: none;
        border: 0;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
