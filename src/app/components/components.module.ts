import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../shared/material/material.module';
import { CalendarModule } from './calendar/calendar.module';
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
import { BuildingTableComponent } from './building-table/building-table.component';
import { LocationTableComponent } from './location-table/location-table.component';
import { RoomTableComponent } from './room-table/room-table.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminResolveComponent } from './admin-resolve/admin-resolve.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { TrainerPageComponent } from './trainer-page/trainer-page.component';
import { TrainerProfileComponent } from './trainer-profile/trainer-profile.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';
import { TrainerCurrentReservationsComponent } from './trainer-current-reservations/trainer-current-reservations.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';


const components = [
  HeaderComponent,
  FooterComponent,
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
  ReservationPageComponent,
  BuildingTableComponent,
  LocationTableComponent,
  RoomTableComponent,
  AdminDashboardComponent,
  AdminResolveComponent,
  AdminPageComponent,
  TrainerPageComponent,
  TrainerProfileComponent,
  TrainerDashboardComponent,
  TrainerCurrentReservationsComponent,
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
    CalendarModule,
    IvyCarouselModule,
  ],
  exports: [components],
})
export class ComponentsModule {}
