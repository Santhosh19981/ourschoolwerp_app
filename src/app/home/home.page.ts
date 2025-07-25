import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LangandparmisionService } from '../services/langandparmision.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { fileUrl } from '../config/config';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [CallNumber],
  standalone: false,
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
 menus:any=[];

 studentMenu:any= [
  { title: 'Call to Teacher', icon: 'call-outline', route: '/call-teacher' },
  { title: 'Call to Principal', icon: 'call-outline', route: '/call-principal' },
  { title: 'Student Info', icon: 'person-circle-outline', route: '/student-info' },
  { title: 'Attendance', icon: 'checkmark-done-outline', route: '/attendance' },
  { title: 'Home Work', icon: 'book-outline', route: '/diary' },
  { title: 'Exam Schedule', icon: 'calendar-outline', route: '/exam-schedule' },
  { title: 'Exam Marks', icon: 'clipboard-outline', route: '/exam-marks' },
  { title: 'Exam Syllabus', icon: 'document-text-outline', route: '/exam-syllabus' },
  { title: 'Fees', icon: 'calculator-outline', route: '/fees' },
  { title: 'Apply Leave', icon: 'medkit-outline', route: '/apply-leave' },
  { title: 'Holidays', icon: 'calendar-number-outline', route: '/holidays' },
  { title: 'Events', icon: 'color-palette-outline', route: '/events' },
  { title: 'Suggestions / Complaints', icon: 'chatbubbles-outline', route: '/suggestions' },
  { title: 'Student Achievements', icon: 'trophy-outline', route: '/achievements' },
  { title: 'Notifications', icon: 'notifications-outline', route: '/notifications' },
  { title: 'SMS Messages', icon: 'mail-outline', route: '/sms-messages' },
  { title: 'Time Table', icon: 'time-outline', route: '/time-table' },
  { title: 'Pay Fee', icon: 'cash-outline', route: '/pay-fee' },
  { title: 'Academic Calendar', icon: 'school-outline', route: '/academic-calendar' },
  { title: 'Whatsapp', icon: 'logo-whatsapp', route: '/youtube' },
  { title: 'Youtube', icon: 'logo-youtube', route: '/youtube' }
];
  permission: any;
  loginprofile: any;
  language: any;
  isLoading:boolean = false;
  teacherNumber:string ="";
  principalNumber: string ="";
   siteUrl: any;
  constructor(private router: Router,
    private langandparmisionService: LangandparmisionService,private callNumber: CallNumber,private toastController: ToastController
  ) {this.siteUrl = fileUrl;}

  ngOnInit(){ 
    const userData = localStorage.getItem('userData');
    if(!userData)
      this.router.navigate(['/login']);
    if(userData){
      const user = JSON.parse(userData);
      if(user.usertype == "Student"){
         this.teacherNumber =  user?.teacher_phone || "";
       this.principalNumber = user?.correspondent_phone || "";
         this.menus = this.studentMenu;
      }
    }
     this.profile();
   
  }

  profile(){
    this.isLoading =true;
    this.langandparmisionService.getUserProfile().subscribe((data: any) => {        
      if(data.status == true)
      {
        setTimeout(() => {
          this.isLoading = false;
         }, 1);
        this.loginprofile = data.data;
        localStorage.setItem('loggedinData',JSON.stringify(this.loginprofile))
      }
       
    })

  }

  permissioncall() {
    this.langandparmisionService.getLangandPermissionCall('dashboard').subscribe((data: any) => {
          if(data.status == true)
          {
            this.permission = data.data.permission;
            this.language = data.language;
            this.menus = Object.keys(data.data.permission).filter(
              key => data.data.permission[key] === 'yes'
            );
            console.log(this.menus);
          }
           
        })
  }

  profileNavigate(){
   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/profile']);
});
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  gotoMenu(menu:any){
    if(menu == 'Call to Teacher')
      this.callTeacher();
    else if(menu == 'Call to Principal')
      this.callPrincipal();
    else if(menu == 'Student Info')
      this.profileNavigate();
    else if(menu == 'Attendance')
      this.router.navigate(['/attendence']);
    else if(menu == 'Events')
      this.router.navigate(['/events']);
    else if(menu == 'Apply Leave')
      this.router.navigate(['/leaves']);
    else if(menu == 'Holidays')
      this.router.navigate(['/holiday']);
    else if(menu == 'Exam Marks')
      this.router.navigate(['/marks']);
    else if(menu == 'Fees')
      this.router.navigate(['/fee']);
     else if(menu == 'Youtube')
      this.router.navigate(['/youtubelinks']);
     else if(menu == 'Whatsapp')
    this.openWhatsApp()
    
  }

  callTeacher() {
    if(!this.teacherNumber){
       const userData:any = localStorage.getItem('userData');
        const user = JSON.parse(userData);
         this.teacherNumber =  user?.teacher_phone || "";
       this.principalNumber = user?.correspondent_phone || "";
         this.menus = this.studentMenu;
    }
    this.callNumber.callNumber(this.teacherNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  callPrincipal() {
    this.callNumber.callNumber(this.principalNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  //  ionViewWillEnter() {
  //   this.profile();
  //  }
   async showToast(message: string, type: 'success' | 'danger' = 'success') {
  const toast = await this.toastController.create({
    message: message,
    duration: 3000,
    color: type, // 'success' (green) or 'danger' (red)
    position: 'top'
  });
  toast.present();
}
  openWhatsApp(): void {
    if(!this.teacherNumber){
      this.showToast('Teacher is not available.', 'danger');
      return;
    }
       
    const whatsappUrl = `https://wa.me/${this.teacherNumber}`;
    window.open(whatsappUrl, '_blank');
  }

}
