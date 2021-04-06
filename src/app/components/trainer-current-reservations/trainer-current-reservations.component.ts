import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from 'src/app/models/reservation';
import { AppConfirmService } from 'src/app/services/app-confirm/app-confirm.service';

@Component({
  selector: 'app-trainer-current-reservations',
  templateUrl: './trainer-current-reservations.component.html',
  styleUrls: ['./trainer-current-reservations.component.sass'],
})
export class TrainerCurrentReservationsComponent implements OnInit {
  cells: number = 1;
  currentReservation?: Reservation;
  reservationIndex = 0;

  reservations: Reservation[] = [
    {
      reservationId: 1,
      reserver: 'name 1',
      startTime: 1617652628,
      endTime: 1617661628,
      roomId: 1,
      status: 'reserved',
    },
    {
      reservationId: 2,
      reserver: 'name 2',
      startTime: 1617657628,
      endTime: 1617661628,
      roomId: 1,
      status: 'reserved',
    },
    {
      reservationId: 3,
      reserver: 'name 3',
      startTime: 1617651628,
      endTime: 1617651628,
      roomId: 1,
      status: 'reserved',
    },
    {
      reservationId: 4,
      reserver: 'name 4',
      startTime: 1617651628,
      endTime: 1617651628,
      roomId: 1,
      status: 'cancelled',
    },
    {
      reservationId: 5,
      reserver: 'name 5',
      startTime: 1617651628,
      endTime: 1617651628,
      roomId: 1,
      status: 'cancelled',
    },
    {
      reservationId: 6,
      reserver: 'name 6',
      startTime: 1617651628,
      endTime: 1617651628,
      roomId: 1,
      status: 'cancelled',
    },
    {
      reservationId: 7,
      reserver: 'name 7',
      startTime: 1617651628,
      endTime: 1617651628,
      roomId: 1,
      status: 'reserved',
    },
  ];

  constructor(private conformService: AppConfirmService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.currentReservation = this.reservations[this.reservationIndex];
  }

  previousReservation() {
    if (this.reservationIndex > 0) {
      this.reservationIndex--;
    } else {
      this.reservationIndex = this.reservations.length - 1;
    }
    this.currentReservation = this.reservations[this.reservationIndex];
  }

  nextReservation() {
    if (this.reservationIndex < this.reservations.length - 1) {
      this.reservationIndex++;
    } else {
      this.reservationIndex = 0;
    }
    this.currentReservation = this.reservations[this.reservationIndex];
  }

  deleteReservation() {
    //TODO make http request to delete the current reservation
    this.conformService.confirm().subscribe( confirm => {
      if(confirm) {
        // will delete
        this.toastr.success("Deleted reservation");
        this.ngOnInit();
      }
    })
  }

}
