import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Building } from 'src/app/models/building';
import { delay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { LocationService } from '../location/location.service';
@Injectable({
  providedIn: 'root',
})
export class BuildingService {

  currentBuilding?: Building = {};

  buildings: Building[] = [
    { buildingId: 10, address: 'address 0', locationId: 1 },
    { buildingId: 1, address: 'address 1', locationId: 1 },
    { buildingId: 2, address: 'address 2', locationId: 2 },
    { buildingId: 3, address: 'address 3', locationId: 1 },
    { buildingId: 4, address: 'address 4', locationId: 1 },
    { buildingId: 5, address: 'address 5', locationId: 2 },
    { buildingId: 6, address: 'address 6', locationId: 3 },
    { buildingId: 10, address: 'address 0', locationId: 1 },
    { buildingId: 1, address: 'address 1', locationId: 1 },
    { buildingId: 2, address: 'address 2', locationId: 2 },
    { buildingId: 3, address: 'address 3', locationId: 1 },
    { buildingId: 4, address: 'address 4', locationId: 1 },
    { buildingId: 5, address: 'address 5', locationId: 2 },
    { buildingId: 6, address: 'address 6', locationId: 3 },
    { buildingId: 10, address: 'address 0', locationId: 1 },
    { buildingId: 1, address: 'address 1', locationId: 1 },
    { buildingId: 2, address: 'address 2', locationId: 2 },
    { buildingId: 3, address: 'address 3', locationId: 1 },
    { buildingId: 4, address: 'address 4', locationId: 1 },
    { buildingId: 5, address: 'address 5', locationId: 2 },
    { buildingId: 6, address: 'address 6', locationId: 3 },
    { buildingId: 10, address: 'address 0', locationId: 1 },
    { buildingId: 1, address: 'address 1', locationId: 1 },
    { buildingId: 2, address: 'address 2', locationId: 2 },
    { buildingId: 3, address: 'address 3', locationId: 1 },
    { buildingId: 4, address: 'address 4', locationId: 1 },
    { buildingId: 5, address: 'address 5', locationId: 2 },
    { buildingId: 6, address: 'address 6', locationId: 3 },
  ];

  constructor(private locationService:LocationService,private authService: AuthService, private httpClient: HttpClient) {}

  baseUrl = 'http://104.154.225.237:80';
  options = {
    headers: {
      Authorization: this.authService.jwt!
    }
  }


  getBuildingsByLocationId(locationId: number): Observable<Building[]> {
    //return of(this.buildings.filter((e) => e.locationId == locationId)).pipe(delay(1000));

    return this.httpClient.get<Building[]>(`${this.baseUrl}/locations/${this.locationService.currentLocation?.locationId}/buildings`, this.options);
  }

  createBuilding(building: Building): Observable<Building> {
    this.buildings.push(building);
    return of(building).pipe(delay(1000));
  }

  updateBuilding(building: Building): Observable<Building> {
    return of(building).pipe(delay(1000));
  }

  deleteBuildingById(buildingId: number): Observable<boolean> {
    return of(false).pipe(delay(1000));
  }

}
