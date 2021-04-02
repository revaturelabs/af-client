import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../shared/material/material.module';
import { LocationPageComponent } from './location-page/location-page.component';
import { InspectLocationComponent } from './inspect-location/inspect-location.component';
import { InspectBuildingComponent } from './inspect-building/inspect-building.component';
import { InspectRoomComponent } from './inspect-room/inspect-room.component';
import { CreateLocationComponent } from './create-location/create-location.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AddLocationComponent } from './add-location/add-location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComfirmComponent } from '../services/app-confirm/app-confirm.component';
import { AddBuildingComponent } from './add-building/add-building.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';

const components = [
  HeaderComponent,
  FooterComponent,
  LocationPageComponent,
  InspectLocationComponent,
  InspectBuildingComponent,
  InspectRoomComponent,
  CreateLocationComponent,
  AddLocationComponent,
  AppComfirmComponent,
  AddBuildingComponent,
  AddRoomComponent,
  LandingPageComponent,
  SigninPageComponent,
  SignupPageComponent,
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [components],
})
export class ComponentsModule {}
