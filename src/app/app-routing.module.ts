import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
     loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'attendence',
    loadChildren: () => import('./pages/attendence/attendence.module').then( m => m.AttendencePageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'leaves',
    loadChildren: () => import('./pages/leaves/leaves.module').then( m => m.LeavesPageModule)
  },
  {
    path: 'apply-leave',
    loadChildren: () => import('./pages/apply-leave/apply-leave.module').then( m => m.ApplyLeavePageModule)
  },
  {
    path: 'holiday',
    loadChildren: () => import('./pages/holiday/holiday.module').then( m => m.HolidayPageModule)
  },
  {
    path: 'marks',
    loadChildren: () => import('./pages/marks/marks.module').then( m => m.MarksPageModule)
  },
  {
    path: 'fee',
    loadChildren: () => import('./pages/fee/fee.module').then( m => m.FeePageModule)
  },
  {
    path: 'youtubelinks',
    loadChildren: () => import('./pages/youtubelinks/youtubelinks.module').then( m => m.YoutubelinksPageModule)
  },
  // Add other protected or unprotected routes below as needed
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
