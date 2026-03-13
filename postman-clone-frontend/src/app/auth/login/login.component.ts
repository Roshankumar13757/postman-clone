import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../services/user.service';


interface LoginResponse {
  success: boolean;
  token: string;
  user: { id: string; username: string; email: string; };
  message?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  loading = false;
  success = false;
  error: string | null = null;
  showPassword = false;

  constructor(private router: Router, private userService: User) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }
    this.loading = true;
    this.error = null;
    this.success = false;

    this.userService.post<LoginResponse>('/auth/login', {
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.success = true;
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          if (this.rememberMe) localStorage.setItem('rememberedEmail', this.email);
          setTimeout(() => this.router.navigate(['/dashboard']), 800);
        } else {
          this.error = res.message || 'Login failed.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Invalid credentials. Please try again.';
      },
    });
  }
}