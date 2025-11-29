import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../_models/register-request';
import { RegisterService } from '../../_services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  registerForm!: FormGroup;
  fb = inject(FormBuilder);
  model!: RegisterRequest;
  registerService = inject(RegisterService);
  router = inject(Router);

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
    }, {validators: this.PasswordMatchValidator});
  }

  PasswordMatchValidator(form: AbstractControl){
    var password = form.get('password')?.value;
    var confirmPassword = form.get('confirmPassword')?.value;
    if(password !== confirmPassword){
      form.get('confirmPassword')?.setErrors({mustMatch: true});
    }
    else{
      form.get('confirmPassword')?.setErrors(null);
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  register(model: any) {
    const { email, password, ...rest } = this.registerForm.value;
    
    // Create a new object with only the fields you want
    const filteredData = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.model = filteredData;

    this.registerService.register(model).subscribe({
      next: (data) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
