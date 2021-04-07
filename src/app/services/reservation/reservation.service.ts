import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { error } from 'selenium-webdriver';
import { Reservation } from '../../models/reservation';
import { Room } from '../../models/room';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  // Replace with production URL later.
  BASE_URL: string = 'http://localhost:8080';

  reservations: Reservation[] = [
    {
      reservationId: 1,
      reserver: 'Jimmy',
      startTime: 1617636382,
      endTime: 1617636382 + 100000,
      roomId: 1,
      status: 'reserved',
    },
    {
      reservationId: 2,
      reserver: 'John',
      startTime: 1617636382 + 200000,
      endTime: 1617636382 + 300000,
      roomId: 1,
      status: 'reserved',
    },
    {
      reservationId: 3,
      reserver: 'Jacob',
      startTime: 1617636382 + 440000,
      endTime: 1617636382 + 490000,
      roomId: 1,
      status: 'reserved',
    },
    {
      reservationId: 4,
      reserver: 'Jimmy',
      startTime: 1617636382 - 250000,
      endTime: 1617636382 - 200000,
      roomId: 1,
      status: 'reserved',
    },
  ];

  constructor(private http: HttpClient) {}

  // Create
  createReservation(
    reservation: Reservation,
    token: string
  ): Observable<Reservation> {
    console.log('reservation.service.createReservation:', reservation);
    // return this.http
    //   .post<Reservation>(`${this.BASE_URL}/rooms/${reservation.roomId}/reservations`, reservation, {
    //     headers: {
    //       Authorization: token,
    //     },
    //   });

    reservation.reservationId = this.reservations.length + 1;
    this.reservations = [...this.reservations, reservation];
    console.log('reservation.service.createReservation:', reservation);
    return of(reservation);
  }

  // Read
  getReservationsByRoom(room: Room): Observable<Reservation[]> {
    return of(this.reservations.filter((e) => e.roomId == room.roomId));
  }

  // Update
  updateReservation(
    reservation: Reservation,
    token: string
  ): Observable<Reservation> {
    // return this.http
    //   .put<Reservation>(
    //     `${this.BASE_URL}/rooms/${reservation.roomId}/reservations/${reservation.reservationId}`,
    //     reservation,
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     }
    //   );

    console.log('reservation.service.updateReservation:', reservation);

    this.reservations = this.reservations.map((r) => {
      if (r.reservationId === reservation.reservationId) {
        return { ...reservation };
      }
      return r;
    });

    return of(reservation);
  }

  // Cancel
  cancelReservation(
    reservation: Reservation,
    token: string
  ): Observable<Reservation> {
    // const res: string = await this.http.request(
    //   'DELETE',
    //   `${this.BASE_URL}/rooms/${reservation.roomId}/reservations/${reservation.reservationId}`, {
    //     headers: {
    //       Authorization: token,
    //     },
    //     responseType: 'text',
    //   }).toPromise();
    // return (res === 'success');

    reservation.status = 'canceled';
    console.log('reservation.service.deleteReservation:', reservation);

    this.reservations = this.reservations.filter(
      (r) => r.reservationId !== reservation.reservationId
    );

    return of(reservation);
  }
}
