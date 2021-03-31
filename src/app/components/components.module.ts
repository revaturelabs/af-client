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

<<<<<<< HEAD

const components = [HeaderComponent, FooterComponent];
=======
const components = [
  HeaderComponent,
  FooterComponent,
  LocationPageComponent,
  InspectLocationComponent,
  InspectBuildingComponent,
  InspectRoomComponent,
  CreateLocationComponent,
  AddLocationComponent
];
>>>>>>> 6986f52d22e0b91d3e18ce356917aee6eb0e82af

@NgModule({
  declarations: [components],
  imports: [CommonModule, MaterialModule, RouterModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [components],
})
export class ComponentsModule {}
