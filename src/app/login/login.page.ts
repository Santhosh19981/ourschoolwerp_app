import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonInput } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication/authentication.service';
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
  user:any = {};
  constructor(private router: Router, 
    private authService: AuthenticationService,) {}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/home']);
    }
  }

  login() {
    if (this.user.username != '' && this.user.password != '') {
      this.authService.login(this.user)
        .then((data: any) => {
          debugger;
          this.authService.publishUserData({
            user: data.profile
          });
          this.authService.publishTokenData({
            token: data.token
          });
          
          if (data) {
            localStorage.setItem('userData',JSON.stringify(data))
            this.router.navigate(['/home']);
          }
        }).catch(error => {
        console.log(error);
      });
    }
    
  }
}
