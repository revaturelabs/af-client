import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationDto } from '../models/location-dto';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  apiBase = environment.apiBase;

  constructor(private http: HttpClient) { }

  getAllLocations(): Observable<Array<LocationDto>> {
    return this.http.get<LocationDto[]>(`${this.apiBase}/locations/`);
  }

  getLocationsByState(state: string) {
    return this.http.get<LocationDto[]>(`${this.apiBase}/locations/state/${state}`);
  }

  getLocationsByCity(city: string) {}

  getLocationsByZipCode(zipCode: string) {}

  getLocationById(index:number) {}

}
