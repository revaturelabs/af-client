import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { AdminResolveComponent } from './components/admin/admin-resolve/admin-resolve.component';
import { CreateLocationComponent } from './components/admin/create-location/create-location.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ReservationPageComponent } from './components/reservation-page/reservation-page.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { SigninPageComponent } from './components/signin-page/signin-page.component';
import { TrainerDashboardComponent } from './components/trainer-dashboard/trainer-dashboard.component';
import { TrainerPageComponent } from './components/trainer-page/trainer-page.component';
import { TrainerProfileComponent } from './components/trainer-profile/trainer-profile.component';
import { AdminGuardService } from './services/route-guard/admin-guard.service';
import { TrainerGuardService } from './services/route-guard/trainer-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'signin', component: SigninPageComponent },
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
      { path: 'my-reservations', component: MyReservationsComponent },
      { path: 'change-password', component: SetPasswordComponent },
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
