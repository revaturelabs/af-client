import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarDceComponent } from './components/calendar/calendar-dce/calendar-dce.component';
import { CalendarKsComponent } from './components/calendar/calendar-ks/calendar-ks.component';
import { CreateLocationComponent } from './components/create-location/create-location.component';
import { InspectBuildingComponent } from './components/inspect-building/inspect-building.component';
import { InspectLocationComponent } from './components/inspect-location/inspect-location.component';
import { InspectRoomComponent } from './components/inspect-room/inspect-room.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LocationPageComponent } from './components/location-page/location-page.component';
import { ReservationPageComponent } from './components/reservation-page/reservation-page.component';
import { SigninPageComponent } from './components/signin-page/signin-page.component';
import { AdminGuardService } from './services/route-guard/admin-guard.service';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'signin', component: SigninPageComponent },
  { path: 'reservation', component: ReservationPageComponent },
  { path: 'calendar', component: CalendarKsComponent },
  {
    path: 'location',
    component: LocationPageComponent,
    canActivate: [AdminGuardService],
    children: [
      { path: '', redirectTo: 'create-location', pathMatch: 'full' },
      // { path: 'inspect-location', component: InspectLocationComponent },
      // { path: 'inspect-building', component: InspectBuildingComponent },
      // { path: 'inspect-room', component: InspectRoomComponent },
      { path: 'create-location', component: CreateLocationComponent },
    ],
  },
  { path: '**', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
