import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RoomDto } from '../models/room-dto';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private httpClient: HttpClient) {}

  getAllRooms(): Observable<RoomDto[]> {
    const url = environment.locationBackendUrl + '/rooms';
    return this.httpClient.get<RoomDto[]>(url);
  }

  getAllRemoteMeetingRooms(): Observable<RoomDto[]> {
    const url = environment.locationBackendUrl + '/rooms/remote/meeting';
    return this.httpClient.get<RoomDto[]>(url);
  }
  getAllPhysicalMeetingRooms(): Observable<RoomDto[]> {
    const url = environment.locationBackendUrl + '/rooms/physical/meeting';
    return this.httpClient.get<RoomDto[]>(url);
  }

  getAllRemoteTrainingRooms(): Observable<RoomDto[]> {
    const url = environment.locationBackendUrl + '/rooms/remote/training';
    return this.httpClient.get<RoomDto[]>(url);
  }

  getAllPhysicalTrainingRooms(): Observable<RoomDto[]> {
    const url = environment.locationBackendUrl + '/rooms/physical/training';
    return this.httpClient.get<RoomDto[]>(url);
  }
}
