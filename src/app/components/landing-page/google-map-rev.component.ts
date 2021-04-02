import { Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'google-map-rev',
    templateUrl: './google-map-rev.component.html',
})
export class GoogleMapRevComponent {
  private API_KEY:string = environment.API_KEY;

  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${this.API_KEY}`, 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

}

