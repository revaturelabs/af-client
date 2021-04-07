import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { GoogleMapRevComponent } from './google-map-rev.component';


@NgModule({
  declarations: [
    GoogleMapRevComponent,
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  exports: [
    GoogleMapRevComponent,
  ],
})
export class GoogleMapRevModule {}