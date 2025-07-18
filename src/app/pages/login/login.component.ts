import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)

  isLoading: boolean = false
  errorMes: string = ''
  succMes: string = ''


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
  })

  submitForm() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          this.errorMes = ''
          this.succMes = res.message

          localStorage.setItem('myToken' , res.token)

          this.authService.getUesrData()
          setTimeout(() => {
            this.router.navigate(['/home'])
          }, 1000)

        }, error: (err) => {
          this.isLoading = false;
          console.log(err.error.message);
          this.errorMes = err.error.message

        }
      })
    }else{
      this.loginForm.markAllAsTouched()
    }

  }
}
