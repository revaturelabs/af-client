import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Building } from 'src/app/models/building';
import { Room, RoomType } from 'src/app/models/room';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { BuildingService } from '../building/building.service';
@Injectable({
  providedIn: 'root',
})
export class RoomService {
  baseUrl = 'http://104.154.225.237:80';
  options = {
    headers: {
      Authorization: this.authService.jwt!,
    },
  };

  currentRoom?: Room = {};
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private buildingService: BuildingService
  ) {}

  getRoomByBuilding(building: Building): Observable<Room[]> {
    return this.httpClient.get<Room[]>(
      `${this.baseUrl}/locations/${building.locationId}/buildings/${building.buildingId}/rooms`,
      this.options
    );
  }

  createRoom(room: Room): Observable<Room> {
    return this.httpClient.post<Room>(
      `${this.baseUrl}/locations/${this.buildingService.currentBuilding?.locationId}/buildings/${room.buildingId}/rooms`,
      room,
      this.options
    );
  }

  updateRoom(room: Room): Observable<Room> {
    return this.httpClient.put<Room>(
      `${this.baseUrl}/locations/${this.buildingService.currentBuilding?.locationId}/buildings/${room.buildingId}/rooms/${room.roomId}`,
      room,
      this.options
    );
  }

  deleteRoom(room: Room): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this.baseUrl}/locations/${this.buildingService.currentBuilding?.locationId}/buildings/${room.buildingId}/rooms/${room.roomId}`,
      this.options
    );
  }
}
