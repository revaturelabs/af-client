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
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { SigninPageComponent } from './components/signin-page/signin-page.component';
import { AdminGuardService } from './services/route-guard/admin-guard.service';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'signin', component: SigninPageComponent },
  { path: 'reservation', component: ReservationPageComponent },
  { path: 'calendar', component: CalendarKsComponent },
  { path: 'change-password', component: SetPasswordComponent },
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
  { path: '**', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
