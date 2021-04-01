import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Building } from 'src/app/models/building';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  
  currentBuilding?: Building;

  buildings = [
    { buildingId: 0, address: 'address 0', locationId: 1 },
    { buildingId: 1, address: 'address 1', locationId: 1 },
    { buildingId: 2, address: 'address 2', locationId: 2 },
    { buildingId: 3, address: 'address 3', locationId: 1 },
    { buildingId: 4, address: 'address 4', locationId: 1 },
    { buildingId: 5, address: 'address 5', locationId: 2 },
    { buildingId: 6, address: 'address 6', locationId: 3 },
    { buildingId: 0, address: 'address 0', locationId: 1 },
    { buildingId: 1, address: 'address 1', locationId: 1 },
    { buildingId: 2, address: 'address 2', locationId: 2 },
    { buildingId: 3, address: 'address 3', locationId: 1 },
    { buildingId: 4, address: 'address 4', locationId: 1 },
    { buildingId: 5, address: 'address 5', locationId: 2 },
    { buildingId: 6, address: 'address 6', locationId: 3 },
    { buildingId: 0, address: 'address 0', locationId: 1 },
    { buildingId: 1, address: 'address 1', locationId: 1 },
    { buildingId: 2, address: 'address 2', locationId: 2 },
    { buildingId: 3, address: 'address 3', locationId: 1 },
    { buildingId: 4, address: 'address 4', locationId: 1 },
    { buildingId: 5, address: 'address 5', locationId: 2 },
    { buildingId: 6, address: 'address 6', locationId: 3 },
    { buildingId: 0, address: 'address 0', locationId: 1 },
    { buildingId: 1, address: 'address 1', locationId: 1 },
    { buildingId: 2, address: 'address 2', locationId: 2 },
    { buildingId: 3, address: 'address 3', locationId: 1 },
    { buildingId: 4, address: 'address 4', locationId: 1 },
    { buildingId: 5, address: 'address 5', locationId: 2 },
    { buildingId: 6, address: 'address 6', locationId: 3 },
  ];

  constructor() {}

  getBuildingsByLocationId(locationId: number): Observable<Building[]> {
    return of(this.buildings.filter((e) => e.locationId == locationId));
  }

  deleteBuildingById(buildingId: number): Observable<boolean> {
    return of(false);
  }
}
