import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Building } from 'src/app/models/building';
import { delay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BuildingService {

  baseUrl = 'http://104.154.225.237:80';
  currentBuilding?: Building = {};
  options = {
    headers: {
      Authorization: this.authService.jwt!
    }
  }

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

  constructor(private authService : AuthService, private httpClient: HttpClient) {}

  getBuildingsByLocationId(locationId: number): Observable<Building[]> {
    return this.httpClient.get<Building[]>(`${this.baseUrl}/locations/${locationId}/buildings`, this.options);
  }

  createBuilding(building: Building): Observable<Building> {
    return this.httpClient.post<Building>(`${this.baseUrl}/locations/${building.locationId}/buildings`,building, this.options);
    this.buildings.push(building);
    return of(building).pipe(delay(1000));
  }

  updateBuilding(building: Building): Observable<Building> {
    return this.httpClient.put<Building>(`${this.baseUrl}/locations/${building.locationId}/buildings/${building.buildingId}`,building, this.options);
    return of(building).pipe(delay(1000));
  }

  deleteBuildingById(building: Building): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/locations/${building.locationId}/buildings/${building.buildingId}`, this.options);
    return of(false).pipe(delay(1000));
  }

}
