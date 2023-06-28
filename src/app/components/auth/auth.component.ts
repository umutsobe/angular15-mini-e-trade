import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from 'src/app/services/auth-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.css'],
  template: `
    <form [formGroup]="frm" (ngSubmit)="onSubmit()" class="w-50 container">
      <div class="alert alert-danger" *ngIf="errorHtml">
        {{ errorHtml }}
      </div>
      <h1 class="mb-4">{{ head }}</h1>
      <div class="mb-3">
        <label for="email" class="form-label">E Mail</label>
        <input type="text" class="form-control" id="email" formControlName="email" />
        <div *ngIf="!email.valid && (email.dirty || email.touched)" style="color:chocolate; font-size: 12px;">E-Mail girişi doğru formatta olmalıdır</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" class="form-control" formControlName="password" />
        <div *ngIf="!password.valid && (password.dirty || password.touched)" style="color:chocolate; font-size: 12px;">Şifre girişi zorunludur</div>
      </div>
      <button type="submit" class="mb-2 w-100 btn btn-primary" [disabled]="!frm.valid">{{ submitString }}</button>
      <button (click)="Toggle()" type="button" class="w-100 btn btn-success">{{ toggleString }}</button>
      <div *ngIf="loading" class="spinner-border " role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </form>
  `,
})
export class AuthComponent {
  frm: FormGroup;
  isLoginMode: boolean = true;
  loading = false;
  errorHtml = '';

  head: string = 'Giriş Yap';
  submitString: string = 'Giriş Yap';
  toggleString: string = 'Üye Ol';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private titleService: Title) {
    this.frm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    titleService.setTitle('Login / Sign Up');
  }
  get email() {
    return this.frm.get('email');
  }
  get password() {
    return this.frm.get('password');
  }
  Toggle() {
    if (this.isLoginMode == true) {
      this.head = 'Üye Ol';
      this.submitString = 'Üye Ol';
      this.toggleString = 'Giriş Yap';
      this.isLoginMode = false;
    } else {
      this.head = 'Giriş Yap';
      this.submitString = 'Giriş Yap';
      this.toggleString = 'Üye Ol';
      this.isLoginMode = true;
    }
  }
  onSubmit() {
    this.loading = true;
    let authResponse: Observable<AuthResponse>;
    if (this.isLoginMode == true) {
      authResponse = this.authService.login(this.email.value, this.password.value);
    } else {
      authResponse = this.authService.register(this.email.value, this.password.value);
    }
    authResponse.subscribe({
      next: () => {
        this.loading = false;
        this.errorHtml = '';
        this.router.navigate(['/']);
      },
      error: (err) => {
        let errorString = err.error.error.message;
        this.loading = false;
        if (errorString == 'EMAIL_NOT_FOUND') {
          this.errorHtml = 'email bulunamadı';
        } else if (errorString == 'INVALID_PASSWORD') {
          this.errorHtml = 'yanlış parola';
        } else if (errorString == 'USER_DISABLED') {
          this.errorHtml = 'kullanıcı bloklu';
        } else if (errorString == 'EMAIL_EXISTS') {
          this.errorHtml = 'e-mail zaten kayıtlı. giriş yapınız.';
        } else if (errorString == 'OPERATION_NOT_ALLOWED') {
          this.errorHtml = 'bu işlemi yapmaya izinli değilsiniz';
        } else if (errorString == 'TOO_MANY_ATTEMPTS_TRY_LATER') {
          this.errorHtml = 'bu cihazda çok fazla işlem yapıldı.daha sonra tekrar deneyiniz';
        }
      },
    });
  }
}
