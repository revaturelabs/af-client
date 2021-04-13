import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
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
    {
      reservationId: 5,
      reserver: 'Jimmy',
      startTime: 1617636382 + 550000,
      endTime: 1617636382 + 560000,
      roomId: 1,
      status: 'canceled',
    },
  ];

  constructor(
    private http: HttpClient,
    private loadingBar: LoadingBarService
  ) {}

  // Create
  createReservation(
    reservation: Reservation,
    token: string
  ): Observable<Reservation> {
    console.log('reservation.service.createReservation:', reservation);
    // return this.http
    //   .post<Reservation>(
    //     `${this.BASE_URL}/rooms/${reservation.roomId}/reservations`,
    //     reservation,
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     }
    //   );

    reservation.reservationId = this.reservations.length + 1;
    this.reservations = [...this.reservations, reservation];
    console.log('reservation.service.createReservation:', reservation);
    return of(reservation).pipe(
      tap(() => this.loadingBar.start()),
      delay(1000),
      tap(() => this.loadingBar.complete())
    );
  }

  // Read
  getReservationsByRoom(room: Room, token: string): Observable<Reservation[]> {
    // return this.http
    //   .get<Reservation[]>(
    //     `${this.BASE_URL}/rooms/${room.roomId}/reservations`,
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     }
    //   );

    return of(this.reservations.filter((e) => e.roomId == room.roomId)).pipe(
      tap(() => this.loadingBar.start()),
      delay(1000),
      tap(() => this.loadingBar.complete())
    );
  }

  getReservationByReserver(): Observable<Reservation[]> {
    return of(this.reservations).pipe(
      tap(() => this.loadingBar.start()),
      delay(1000),
      tap(() => this.loadingBar.complete())
    );
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

    this.reservations = this.reservations.map((r) => {
      if (r.reservationId === reservation.reservationId) {
        return { ...reservation };
      }
      return r;
    });

    return of(reservation).pipe(
      tap(() => this.loadingBar.start()),
      delay(1000),
      tap(() => this.loadingBar.complete())
    );
  }

  // Cancel
  cancelReservation(
    reservation: Reservation,
    token: string
  ): Observable<Reservation> {
    // return this.http
    //   .delete<Reservation>(
    //     `${this.BASE_URL}/rooms/${reservation.roomId}/reservations/${reservation.reservationId}`,
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     }
    //   );

    reservation.status = 'canceled';
    console.log('reservation.service.deleteReservation:', reservation);

    this.reservations = this.reservations.filter(
      (r) => r.reservationId !== reservation.reservationId
    );

    return of(reservation).pipe(
      tap(() => this.loadingBar.start()),
      delay(1000),
      tap(() => this.loadingBar.complete())
    );
  }
}
