import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  @Input() selectedReservation: Reservation;
  response: string;
  roomId: number;
  reservations: Reservation[];

  constructor( private reservationService: ReservationService, private router: Router ) {

  }

  ngOnInit(): void {
    this.reservationService.getAllReservations()
      .subscribe((reservations: Reservation[]) => {
        console.log('getting reservations');
        this.reservations = reservations;
      });
  }

  getAllReservationsByRoomId(roomId: number): void {

    this.reservationService.getAllReservationsByRoomId(roomId)
      .subscribe((reservations: Reservation[]) => {
        console.log('getting reservations by room id');
        this.reservations = reservations;
      });
  }

  async add(buildingId, roomType): Promise<void> {
    let newReservation: Reservation;
    buildingId = buildingId.trim();
    roomType = roomType.trim();
    if (!buildingId) { return; }
    newReservation.buildingId = buildingId;
    newReservation.roomType = roomType;
    this.reservationService.addReservation(newReservation)
      .subscribe((res : Reservation) => {
        this.reservations.push(res);
      });
  }

}
