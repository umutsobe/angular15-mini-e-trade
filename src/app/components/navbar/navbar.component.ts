import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar mb-0">
      <div class="container">
        <div class="left">
          <a routerLink="home" class="navbar-brand">Shop App</a>
          <a routerLink="home" class="nav-item nav-item me-3">Home</a>
          <a routerLink="products" class="nav-item nav-item me-3">Products</a>
          <a *ngIf="isAdmin" routerLink="createProduct" class="nav-item nav-item me-3">Create Product</a>
          <a *ngIf="isAdmin" routerLink="createCategory" class="nav-item nav-item me-3">Create Category</a>
        </div>
        <div class="right d-flex">
          <button *ngIf="!isAuthenticated" routerLink="auth" class="btn btn-success me-2">Giriş Yap</button>
          <div *ngIf="isAuthenticated" class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Account</button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><a role="button" class="dropdown-item">Hesabım</a></li>
              <li><a role="button" class="dropdown-item">Siparişler</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a (click)="logout()" role="button" class="dropdown-item">Çıkış Yap</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; //değişkenin null, undefined, 0, NaN, false, veya boş bir dize gibi değeri varsa false, aksi takdirde yani değişken "varsa" true döndürür.
      if (user && user.email == 'umutsobee@gmail.com') {
        this.isAdmin = true;
      }
    });
  }
  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
