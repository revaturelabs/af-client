import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminResolveComponent } from './components/admin-resolve/admin-resolve.component';
import { CalendarDceComponent } from './components/calendar/calendar-dce/calendar-dce.component';
import { CalendarKsComponent } from './components/calendar/calendar-ks/calendar-ks.component';
import { CreateLocationComponent } from './components/create-location/create-location.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ReservationPageComponent } from './components/reservation-page/reservation-page.component';
import { SigninPageComponent } from './components/signin-page/signin-page.component';
import { TrainerDashboardComponent } from './components/trainer-dashboard/trainer-dashboard.component';
import { TrainerPageComponent } from './components/trainer-page/trainer-page.component';
import { TrainerProfileComponent } from './components/trainer-profile/trainer-profile.component';
import { AdminGuardService } from './services/route-guard/admin-guard.service';
import { TrainerGuardService } from './services/route-guard/trainer-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'signin', component: SigninPageComponent },
  { path: 'reservation', component: ReservationPageComponent },
  { path: 'calendar', component: CalendarKsComponent },
  {
    path: 'admin-page',
    component: AdminPageComponent,
    canActivate: [AdminGuardService],
    children: [
      { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
      { path: 'resolve', component: AdminResolveComponent },
      { path: 'create-location', component: CreateLocationComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
    ],
  },
  {
    path: 'trainer-page',
    component: TrainerPageComponent,
    canActivate: [TrainerGuardService],
    children: [
      { path: '', redirectTo: 'trainer-dashboard', pathMatch: 'full' },
      { path: 'trainer-profile', component: TrainerProfileComponent },
      { path: 'reservation', component: ReservationPageComponent },
      { path: 'trainer-dashboard', component: TrainerDashboardComponent },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: LandingPageComponent },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
