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
  constructor(private reservationService: ReservationService, private router: Router) {

  }
  reservations: Reservation[]
  ngOnInit(): void {
    this.reservationService.getAllReservations()
      .subscribe((reservations: Reservation[]) => {
        console.log('getting reservations');
        this.reservations = reservations;
      });
  }
  getAllReservationsByRoomId(roomId : number):void {
    // let roomId = idForm.value.searchId
    this.reservationService.getAllReservationsByRoomId(roomId)
      .subscribe((reservations: Reservation[]) => {
        console.log('getting reservations by room id');
        this.reservations = reservations;
      });
  }

}
