import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm !: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    }
    );
  }

  login(){
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        alert("Login is Success!");
        localStorage.setItem("user_id", res.data._id);
        localStorage.setItem("user_data", JSON.stringify(res.data));
        this.authService.isLoggedIn$.next(true);
        if(res.data.isAdmin){
          this.router.navigate(['admin']);
        }else{
          this.router.navigate(['home']);
        }
        this.loginForm.reset();

      },
      error:(err)=>{
        console.log(err);
        alert(err.error)
      }
    })
  }
}
