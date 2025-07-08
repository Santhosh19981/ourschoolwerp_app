import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-youtubelinks',
  templateUrl: './youtubelinks.page.html',
  styleUrls: ['./youtubelinks.page.scss'],
    standalone: false,
})
export class YoutubelinksPage implements OnInit {

  constructor(private navCtrl: NavController,private router: Router) { }

  ngOnInit() {
  }
 navigateHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
