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
      state: 'MA',
      city: 'Boston',
      zipCode: '02118',
    },
    {
      locationId: 3,
      name: 'location 3',
      state: 'MA',
      city: 'Boston',
      zipCode: '02116',
    },
    {
      locationId: 4,
      name: 'location 4',
      state: 'MA',
      city: 'Boston',
      zipCode: '02116',
    },
    {
      locationId: 5,
      name: 'location 1',
      state: 'MA',
      city: 'Boston',
      zipCode: '02116',
    },
    {
      locationId: 6,
      name: 'location 1',
      state: 'MA',
      city: 'Boston',
      zipCode: '02116',
    },
  ];

  constructor() {}


  getAllLocation():Observable<Location[]> {
    return of(this.locations);
  }

  deleteLocation():Observable<boolean> {
    return of(false);
  }

  createLocation(location: Location): Observable<Location> {
    this.locations.push(location);
    return of(location);
  }

  
}
