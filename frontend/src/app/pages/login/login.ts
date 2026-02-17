import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = 'MADAVI';
  password = '';
  selectedRole = '';
  roles = ['Admin', 'Doctor', 'Nurse', 'Receptionist'];

  constructor(private router: Router) { }

  onLogin() {
    if (!this.selectedRole) {
      alert('Please select a role to login.');
      return;
    }

    // Simple authentication - in real app, call auth service
    if (this.username) {
      // Store user details and role in localStorage
      localStorage.setItem('user', JSON.stringify({
        username: this.username,
        role: this.selectedRole
      }));

      console.log(`Login successful as ${this.selectedRole}`);
      this.router.navigate(['/dashboard']);
    }
  }
}
