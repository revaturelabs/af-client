import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Building } from 'src/app/models/building';
import { Room, RoomType } from 'src/app/models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  rooms: Room[] = [
    { roomId: 11, name: "room 0", capacity: 200, buildingId: 1, type: RoomType.CLASSROOM },
    { roomId: 1, name: "room 1", capacity: 150, buildingId: 1, type: RoomType.CLASSROOM  },
    { roomId: 2, name: "room 2", capacity: 800, buildingId: 2, type: RoomType.CLASSROOM  },
    { roomId: 3, name: "room 3", capacity: 100, buildingId: 3, type: RoomType.CLASSROOM  },
    { roomId: 4, name: "room 4", capacity: 100, buildingId: 4, type: RoomType.CLASSROOM },
    { roomId: 5, name: "room 5", capacity: 100, buildingId: 5, type: RoomType.CLASSROOM  },
    { roomId: 6, name: "room 6", capacity: 1100, buildingId: 1, type: RoomType.ONLINE },
    { roomId: 7, name: "room 7", capacity: 1020, buildingId: 2, type: RoomType.ONLINE },
    { roomId: 8, name: "room 8", capacity: 1010, buildingId: 4, type: RoomType.ONLINE },
    { roomId: 9, name: "room 9", capacity: 1100, buildingId: 5, type: RoomType.ONLINE },
    { roomId: 10, name: "room 10", capacity: 200, buildingId: 1, type: RoomType.ONLINE },


  ]

  constructor() { }

  getRoomByBuilding(building: Building): Observable<Room[]> {
    return of(this.rooms.filter( e => e.buildingId == building.buildingId));
  }

  createRoom(room: Room): Observable<Room> {
    return of(room);
  }

  updateRoom(room: Room): Observable<Room> {
    return of(room);
  }

  deleteRoom(room: Room): Observable<boolean> {
    return of(false);
  }


}
