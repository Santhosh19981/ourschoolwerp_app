import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { App as CapacitorApp } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.initializeApp();
    this.handleBackButton();
  }

  async initializeApp() {
    await this.platform.ready();

    // Optional: Show splash screen for 1 second
    await SplashScreen.show({
      showDuration: 1000,
      autoHide: true,
    });

    // Delay to allow routing system to be ready
    setTimeout(() => {
      const studentData = localStorage.getItem('loggedinData');
      let parsedData: any = null;

      try {
        parsedData = studentData ? JSON.parse(studentData) : null;
      } catch (e) {
        console.error('Invalid student data in localStorage:', e);
      }

      if (parsedData && parsedData.usertype.usertype == "Student") {
        this.router.navigate(['/home'], { replaceUrl: true });
      } else {
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    }, 300); // Small delay to avoid race conditions
  }

  handleBackButton() {
    this.platform.ready().then(() => {
      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (this.router.url === '/home') {
          CapacitorApp.exitApp();
        } else {
          window.history.back();
        }
      });
    });
  }
}
