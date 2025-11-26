import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../_models/register-request';
import { envirement } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  http = inject(HttpClient)
  baseUrl = envirement.apiUrl
  register(model: RegisterRequest) {
    return this.http.post(`${this.baseUrl}register`, model);
  }

}
