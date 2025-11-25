import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../_models/login-request';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  signInForm!: FormGroup;
  fb = inject(FormBuilder);
  loginService = inject(LoginService);
  router = inject(Router);

  createForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

    ngOnInit(): void {
    this.createForm();
  }

  signIn(loginRequest: LoginRequest) {
    this.loginService.logIn(loginRequest).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
        console.log(response);
      },
      error: (error) => {
        console.log('error while sedding request',error);
      }
    })
  }

}
