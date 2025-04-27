import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LangandparmisionService } from '../services/langandparmision.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
 menus:any=[];
 studentMenu:any= [
  { title: 'Call to Teacher', icon: 'call-outline', route: '/call-teacher' },
  { title: 'Call to Principal', icon: 'call-outline', route: '/call-principal' },
  { title: 'Student Info', icon: 'person-circle-outline', route: '/student-info' },
  { title: 'Attendance', icon: 'checkmark-done-outline', route: '/attendance' },
  { title: 'Diary', icon: 'book-outline', route: '/diary' },
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
  { title: 'Youtube', icon: 'logo-youtube', route: '/youtube' }
];
  permission: any;
  loginprofile: any;
  language: any;
  isLoading:boolean = false;
  constructor(private router: Router,
    private langandparmisionService: LangandparmisionService,
  ) {}

  ngOnInit(){
    const userData = localStorage.getItem('userData');
    if(!userData)
      this.router.navigate(['/login']);
    if(userData){
      const user = JSON.parse(userData);
      if(user.usertype == "Student")
        this.menus = this.studentMenu;
    }
      
    this.permissioncall();
    this.profile();
  }
  profile(){
    this.isLoading =true;
    this.langandparmisionService.getUserProfile().subscribe((data: any) => {
     setTimeout(() => {
      this.isLoading = false;
     }, 1);
     
      if(data.status == true)
      {
        this.loginprofile = data.data
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
    this.router.navigate(['/profile']);
  }
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
