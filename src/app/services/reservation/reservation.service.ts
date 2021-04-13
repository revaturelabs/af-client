import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Reservation } from '../../models/reservation';
import { Room } from '../../models/room';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  // Replace with production URL later.
  BASE_URL: string = 'http://23.251.149.85:80';

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
    private authService: AuthService,
    private http: HttpClient,
    private loadingBar: LoadingBarService
  ) {}

  options = {
    headers: {
      Authorization: this.authService.jwt!
    }
  }

  // Create
  createReservation(
    reservation: Reservation
  ): Observable<Reservation> {
    console.log('reservation.service.createReservation:', reservation);
    let body =  // formatting reservation with fields the backend expects
    {
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      roomId: reservation.roomId,
      title: reservation.title
    }
    
    return this.http
      .post<Reservation>(
        `${this.BASE_URL}/reservations`,body,
        this.options
      );

    // reservation.reservationId = this.reservations.length + 1;
    // this.reservations = [...this.reservations, reservation];
    // console.log('reservation.service.createReservation:', reservation);
    // return of(reservation).pipe(
    //   tap(() => this.loadingBar.start()),
    //   delay(1000),
    //   tap(() => this.loadingBar.complete())
    // );
  }

  // Read
  getReservationsByRoom(room: Room): Observable<Reservation[]> {
    console.log(room.roomId);
    return this.http
      .get<Reservation[]>(
        `${this.BASE_URL}/reservations?roomId=${room.roomId}`,this.options
      );

    // return of(this.reservations.filter((e) => e.roomId == room.roomId)).pipe(
    //   tap(() => this.loadingBar.start()),
    //   delay(1000),
    //   tap(() => this.loadingBar.complete())
    // );
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
    reservation: Reservation
  ): Observable<Reservation> {
    const body =  // formatting reservation with fields the backend expects
    {
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      title: reservation.title
    }
    return this.http
      .patch<Reservation>(
        `${this.BASE_URL}/reservations/${reservation.reservationId}`,
        body,
        this.options
      );

    // this.reservations = this.reservations.map((r) => {
    //   if (r.reservationId === reservation.reservationId) {
    //     return { ...reservation };
    //   }
    //   return r;
    // });

    // return of(reservation).pipe(
    //   tap(() => this.loadingBar.start()),
    //   delay(1000),
    //   tap(() => this.loadingBar.complete())
    // );
  }

  // Cancel
  cancelReservation(
    reservation: Reservation
  ): Observable<Reservation> {
    return this.http
      .patch<Reservation>(
        `${this.BASE_URL}/reservations/${reservation.reservationId}?action=cancel`,
        {},
        this.options
      );

    // reservation.status = 'canceled';
    // console.log('reservation.service.deleteReservation:', reservation);

    // this.reservations = this.reservations.filter(
    //   (r) => r.reservationId !== reservation.reservationId
    // );

    // return of(reservation).pipe(
    //   tap(() => this.loadingBar.start()),
    //   delay(1000),
    //   tap(() => this.loadingBar.complete())
    // );
  }
}
