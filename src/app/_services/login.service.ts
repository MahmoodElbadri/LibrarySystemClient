import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginRequest } from '../_models/login-request';
import { LoginResponse } from '../_models/login-response';
import { map } from 'rxjs';
import { envirement } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = envirement.apiUrl;
  http = inject(HttpClient);
  router = inject(Router);

  // 1. Initialize Signals from Storage
  currentUser = signal<LoginResponse | null>(this.getUserFromStorage());
  currentEmail = signal<string | null>(this.getUserFromStorageEmail());
  currentRole = signal<string | null>(localStorage.getItem('role'));

  private getUserFromStorage(): LoginResponse | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  private getUserFromStorageEmail(): string | null {
    // Simply get the string directly. No need for JSON.parse if we store it as a string
    return localStorage.getItem('email');
  }

  logIn(loginReq: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}login`, loginReq).pipe(
      map((response) => {
        if (response) {
          // 2. Set both User and Email (Storage + Signal)
          this.setCurrentUser(response);
          this.setCurrentEmail(loginReq.email);
        }
        return response;
      })
    );
  }

  // login.service.ts

  getUserRole(email: string) { 
    let params = new HttpParams().set('email', email);

    return this.http.get(`${this.baseUrl}roles`, { params: params, responseType: 'text' }).pipe(
      map((role) => {
        if (role) {
          this.setCurrentRole(role);
        }
        return role;
      })
    );
  }

  setCurrentRole(role: string) {
    localStorage.setItem('role', role); 
    this.currentRole.set(role);
  }

  // Helper to save User
  setCurrentUser(user: LoginResponse) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  // Helper to save Email
  setCurrentEmail(email: string) {
    localStorage.setItem('email', email);
    this.currentEmail.set(email);
  }
  
  logOut() {

    this.router.navigate(['/login']);
    // Clear both items from storage
    localStorage.removeItem('user');
    localStorage.removeItem('email'); 
    localStorage.removeItem('role');
    
    // Reset signals
    this.currentUser.set(null);
    this.currentEmail.set(null);
    this.currentRole.set(null);
  }
}