import { Component} from '@angular/core';
import {environment} from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'google-map-rev',
    templateUrl: './google-map-rev.component.html',
    styleUrls: ['./google-map-rev.component.sass']
})
export class GoogleMapRevComponent {
  private API_KEY:string = environment.API_KEY;
  // using lat and lng for revature headquarters
  center: google.maps.LatLngLiteral = {lat: 38.9533438, lng: -77.3526221}
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    opacity: 0.75,
    title: "Office Location"
  }
  markerPositions: google.maps.LatLngLiteral[] = [
    //Reston,VA
    {lat: 38.9555767, lng: -77.3840807},
    //Tampa,FL
    {lat: 27.9944116, lng: -82.5943618},
    //NYC, NY
    {lat: 40.6971495, lng: -74.2598514},
    //Dallas, TX
    {lat: 32.8203525, lng: -97.0117255},
    //Orlando, FL
    {lat: 28.4810971, lng: -81.5089198},
    //Morgantown, WV
    {lat: 39.6350857, lng: -79.9784846}
  ]

  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${this.API_KEY}`, 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

}

