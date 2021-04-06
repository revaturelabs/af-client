import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reservation } from '../../models/reservation';
import { Room } from '../../models/room';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservations: Reservation[] = [
    {
      reservationId: 1,
      reserver: 'Jimmy',
      startTime: 1617636382,
      endTime: 1617636382 + 100000,
      roomId: 1,
      status: 'reserved'
    },
    {
      reservationId: 2,
      reserver: 'John',
      startTime: 1617636382,
      endTime: 1617636382 +200000,
      roomId: 1,
      status: 'reserved'
    },
    {
      reservationId: 3,
      reserver: 'Jacob',
      startTime: 1617636382,
      endTime: 1617636382+ 100000,
      roomId: 1,
      status: 'reserved'
    },
    {
      reservationId: 4,
      reserver: 'Jimmy',
      startTime: 1617636382,
      endTime: 1617636382+ 100000,
      roomId: 1,
      status: 'reserved'
    }
  ]

  constructor(private http: HttpClient) { }

  getReservationsByRoom(room: Room): Observable<Reservation[]>{
    return of(this.reservations.filter(e => e.roomId == room.roomId));
  }
  updateReservation(reservation: Reservation, token:string): Observable<Reservation>{
    console.log("Updated: " , reservation);
    
    //reservation = this.http.put<Reservation>(`${this.baseUrl}/reservation/${reservation.reservationId}`, reservation, {headers: { Authorization: `${token}`}})
    return of(reservation);
  }

}
