import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.page.html',
  styleUrls: ['./apply-leave.page.scss'],
  standalone: false,
})
export class ApplyLeavePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  navigatetoLeaves(){
    this.navCtrl.navigateRoot('/leaves');
  }
  navigateHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
