import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonInput } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})

export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/home']);
    }
  }

  login() {
    const defaultEmail = 'admin@schoolerp.com';
    const defaultPassword = 'admin123';

    if (this.email === defaultEmail && this.password === defaultPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}
