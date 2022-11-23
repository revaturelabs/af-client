import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../shared/material/material.module';
import { CalendarModule } from './calendar/calendar.module';
import { InspectBuildingComponent } from './admin/inspect-building/inspect-building.component';
import { CreateLocationComponent } from './admin/create-location/create-location.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComfirmComponent } from '../services/app-confirm/app-confirm.component';
import { AddBuildingComponent } from './admin/add-building/add-building.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { GoogleMapRevModule } from '../components/landing-page/google-map/google-map-rev.module';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { BuildingTableComponent } from './building-table/building-table.component';
import { LocationTableComponent } from './location-table/location-table.component';
import { RoomTableComponent } from './room-table/room-table.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminResolveComponent } from './admin/admin-resolve/admin-resolve.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { TrainerPageComponent } from './trainer-page/trainer-page.component';
import { TrainerProfileComponent } from './trainer-profile/trainer-profile.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';
import { TrainerCurrentReservationsComponent } from './trainer-current-reservations/trainer-current-reservations.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NotFoundComponent } from './not-found/not-found.component';
import { SecondsHoursPipe } from '../pipes/seconds-hours.pipe';
import { AddLocationComponent } from './admin/add-location/add-location.component';
import { AddRoomComponent } from './admin/add-room/add-room.component';
import { InspectLocationComponent } from './admin/inspect-location/inspect-location.component';
import { InspectRoomComponent } from './admin/inspect-room/inspect-room.component';
import { RegSuccessDialogComponent } from './reg-success-dialog/reg-success-dialog.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';

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
  NotFoundComponent,
  SetPasswordComponent,
  RegSuccessDialogComponent,
  MyReservationsComponent,
];

@NgModule({
  declarations: [components, SecondsHoursPipe],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapRevModule,
    CalendarModule,
    IvyCarouselModule,
  ],
  exports: [components],
})
export class ComponentsModule {}
