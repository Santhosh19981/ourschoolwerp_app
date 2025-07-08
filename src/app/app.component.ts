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
  constructor(private platform: Platform,
    private navCtrl: NavController,
    private router: Router) {
    this.initializeApp();
    this.splashScreen();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        // Customize behavior
        if (this.router.url === '/home') {
          // Exit app if user is on home screen
          CapacitorApp.exitApp();
        } else {
          // Otherwise navigate back
          window.history.back();
        }
      });
    });
  }
  async splashScreen() {
    await SplashScreen.show({
      showDuration: 10000,
      autoHide: true,
    });
  }

}
