import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../_models/login-request';
import { LoginResponse } from '../_models/login-response';
import { map } from 'rxjs';
import { envirement } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = envirement.apiUrl;
  http = inject(HttpClient);

  // Signal to track user state
  currentUser = signal<LoginResponse | null>(this.getUserFromStorage());

  // Helper function to safely read from storage
  private getUserFromStorage(): LoginResponse | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  logIn(loginReq: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}login`, loginReq).pipe(
      map((response) => {
        if (response) {
          this.setCurrentUser(response);
        }
        return response;
      })
    );
  }

  setCurrentUser(user: LoginResponse) {
    // 1. Save to LocalStorage
    localStorage.setItem('user', JSON.stringify(user));
    // 2. Update the Signal
    this.currentUser.set(user);
  }

  logOut() {
    localStorage.removeItem('user'); // Don't forget to clear storage on logout
    this.currentUser.set(null);
  }
}
