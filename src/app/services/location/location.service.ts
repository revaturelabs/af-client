import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Location } from 'src/app/models/location';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locations: Location[] = [
    {
      locationId: 1,
      name: 'location 1',
      state: 'MA',
      city: 'Boston',
      zipCode: '02116',
    },
    {
      locationId: 2,
      name: 'location 2',
      state: 'NY',
      city: 'New York City',
      zipCode: '10001',
    },
    {
      locationId: 3,
      name: 'location 3',
      state: 'AL',
      city: 'Montgomery',
      zipCode: '12112',
    },
    {
      locationId: 4,
      name: 'location 4',
      state: 'NJ',
      city: 'Newark',
      zipCode: '22116',
    },
    {
      locationId: 5,
      name: 'location 5',
      state: 'WA',
      city: 'Seattle',
      zipCode: '52116',
    },
    {
      locationId: 6,
      name: 'location 6',
      state: 'SD',
      city: 'Pierre',
      zipCode: '32116',
    },
  ];

  currentLocation?: Location = {};
  baseUrl = 'http://104.154.225.237:80';
  options = {
    headers: {
      Authorization: this.authService.jwt!
    }
  }

  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  getAllLocation(): Observable<Location[]> {
    //return of(this.locations).pipe(delay(1500));
    return this.httpClient.get<Location[]>(`${this.baseUrl}/locations`, this.options);
  }

  deleteLocation(localtion: Location): Observable<boolean> {
    return of(false).pipe(delay(1500));
    return this.httpClient.delete<boolean>(`${this.baseUrl}/locations/${localtion.locationId}`, this.options);

  }

  createLocation(location: Location): Observable<Location> {
    this.locations.push(location);
    return of(location).pipe(delay(1500));
    return this.httpClient.post<Location>(`${this.baseUrl}/locations`, location, this.options);

  }

  updateLocation(location: Location): Observable<Location> {
    return of(location).pipe(delay(1500));
    return this.httpClient.put<Location>(`${this.baseUrl}/locations/${location.locationId}`, location, this.options);

  }

}
