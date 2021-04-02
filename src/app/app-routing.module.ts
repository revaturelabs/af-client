import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLocationComponent } from './components/create-location/create-location.component';
// import { InspectBuildingComponent } from './components/inspect-building/inspect-building.component';
// import { InspectLocationComponent } from './components/inspect-location/inspect-location.component';
// import { InspectRoomComponent } from './components/inspect-room/inspect-room.component';
// import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { GoogleMapRevComponent } from './components/landing-page/google-map-rev.component';
import { LocationPageComponent } from './components/location-page/location-page.component';
import { SigninPageComponent } from './components/signin-page/signin-page.component';

const routes: Routes = [
  { path: '', component: GoogleMapRevComponent },
  { path: 'signin', component: SigninPageComponent },
  {
    path: 'location',
    component: LocationPageComponent,
    children: [
      { path: '', redirectTo: 'create-location', pathMatch: 'full' },
      // { path: 'inspect-location', component: InspectLocationComponent },
      // { path: 'inspect-building', component: InspectBuildingComponent },
      // { path: 'inspect-room', component: InspectRoomComponent },
      { path: 'create-location', component: CreateLocationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
