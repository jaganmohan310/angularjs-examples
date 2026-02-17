import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = 'MADAVI';
  password = '';

  constructor(private router: Router) { }

  onLogin() {
    // Simple authentication - in real app, call auth service
    if (this.username) {
      this.router.navigate(['/dashboard']);
    }
  }
}
