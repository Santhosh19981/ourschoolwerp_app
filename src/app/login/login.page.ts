import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonInput } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Platform, ToastController } from '@ionic/angular';
import { LangandparmisionService } from '../services/langandparmision.service';
import { Device } from '@capacitor/device';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})

export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  userdata:any;
  errorMessage: string = '';
  user:any = {};
  constructor(private router: Router, private platform: Platform,private apiservice: LangandparmisionService,
    private authService: AuthenticationService,  private toastController: ToastController) {}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/home']);
    }
  }
  async showToast(message: string, type: 'success' | 'danger' = 'success') {
  const toast = await this.toastController.create({
    message: message,
    duration: 3000,
    color: type, // 'success' (green) or 'danger' (red)
    position: 'top'
  });
  toast.present();
}

  async login() {
    if (this.user.username != '' && this.user.password != '') {
      this.authService.login(this.user)
        .then(async (data: any) => {
          
          this.userdata = data.profile;
          this.authService.publishUserData({
            user: data.profile
          });
          this.authService.publishTokenData({
            token: data.token
          });
          
          if (data) {
            localStorage.setItem('userData',JSON.stringify(data))
             this.showToast('Login successful!', 'success');
           await this.sendDeviceToken()
           // this.router.navigate(['/home']);
          }
        }).catch(error => {
            this.showToast('Invalid login details.', 'danger');
        console.log(error);
      });
    }
    
  }

 async sendDeviceToken() {
  try {
    
    const id: any = await Device.getId();
    const platform = this.platform.is('android') ? 'android' : 'ios';

    const payload = {
      studentID: this.userdata.loginuserID,
      device_token: id.identifier,
      platform: platform
    };

    this.apiservice.sendDeviceToken(payload).subscribe({
      next: (data: any) => {

        if (data && data.status === true) {
          this.router.navigate(['/home']);
        } else {
            this.showToast('Failed to send device token:', 'danger');

          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
          this.showToast(error, 'danger');
        this.router.navigate(['/home']);
      }
    });
  } catch (err:any) {
      this.showToast(err, 'danger');
    this.router.navigate(['/home']);
  }
}

}
