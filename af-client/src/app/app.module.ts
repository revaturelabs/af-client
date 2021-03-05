import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { LocationService } from './services/location.service';
=======
import { LocationComponent } from './location/location.component';
import { ReservationComponent } from './reservation/reservation.component';
import { BuildingComponent } from './building/building.component';
import { RoomComponent } from './room/room.component';
>>>>>>> d28e3cfe9176879913aa9ced3c2e80fe1cbe3fa8

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    ReservationComponent,
    BuildingComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
