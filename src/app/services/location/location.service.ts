import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Location } from 'src/app/models/location';

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

  constructor() {}

  getAllLocation(): Observable<Location[]> {
    return of(this.locations);
  }

  deleteLocation(localtion: Location): Observable<boolean> {
    return of(false);
  }

  createLocation(location: Location): Observable<Location> {
    this.locations.push(location);
    return of(location);
  }

  updateLocation(location: Location): Observable<Location> {
    location.locationId = 9999;
    return of(location);
  }

}
