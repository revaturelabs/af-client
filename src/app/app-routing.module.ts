import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectBuildingComponent } from './components/inspect-building/inspect-building.component';
import { InspectLocationComponent } from './components/inspect-location/inspect-location.component';
import { InspectRoomComponent } from './components/inspect-room/inspect-room.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LocationPageComponent } from './components/location-page/location-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'location',
    component: LocationPageComponent,
    children: [
      { path: '', redirectTo: 'inspect-location', pathMatch: 'full' },
      { path: 'inspect-location', component: InspectLocationComponent },
      { path: 'inspect-building', component: InspectBuildingComponent },
      { path: 'inspect-room', component: InspectRoomComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
