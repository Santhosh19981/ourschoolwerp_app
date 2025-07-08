import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.page.html',
  styleUrls: ['./fee.page.scss'],
   standalone: false,
})
export class FeePage implements OnInit {
  islist:boolean = true;
  isSummary:boolean = false;
  ispayment:boolean = false;
  constructor(private navCtrl: NavController,private router: Router,) { }

  ngOnInit() {
  }
  navigateHome() {
    if(this.ispayment){
      this.ispayment = false;
      this.isSummary = true;
    }else if(this.isSummary){
       this.islist = true;
       this.isSummary = false;
    } else
    this.navCtrl.navigateRoot('/home');
  }
  gotoSummary(){
    this.isSummary = true;
    this.islist = false;
  }
  paynow(){
    if(this.isSummary){
    this.ispayment = true;
    this.isSummary = false;
    }
      
  }
}
