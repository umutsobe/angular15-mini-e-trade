import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './user-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  SignUpUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  SignInUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  url: string = environment.firebase.databaseURL;

  apiKey: string = 'AIzaSyBVvQgxWhbHVJVc34Fjb8lHSc9mV7suJsQ';
  user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient) {}

  register(email: string, password: string, username: string) {
    return this.http
      .post<AuthResponse>(this.SignUpUrl + this.apiKey, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((response) => {
          const expirationDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);

          const user = new User(response.email, response.localId, response.idToken, expirationDate, username);
          this.user.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(this.SignInUrl + this.apiKey, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((response) => {
          const expirationDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);

          const user = new User(response.email, response.localId, response.idToken, expirationDate);
          this.user.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }
  autoLogin() {
    if (localStorage.getItem('user') == null) {
      return;
    }
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));

    if (loadedUser.token) {
      //token geçerliliği kontrol ediliyor. user model içindeki get token metodu aracılığı ile.
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
  }
}

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
