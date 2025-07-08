import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.page.html',
  styleUrls: ['./leaves.page.scss'],
  standalone: false,
})
export class LeavesPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  navigateHome() {
    this.navCtrl.navigateRoot('/home');
  }
  applyLeave(){
    this.navCtrl.navigateRoot('/apply-leave');
  }
}
