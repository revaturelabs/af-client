import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from 'src/app/models/reservation';
import { AppConfirmService } from 'src/app/services/app-confirm/app-confirm.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-trainer-current-reservations',
  templateUrl: './trainer-current-reservations.component.html',
  styleUrls: ['./trainer-current-reservations.component.sass'],
})
export class TrainerCurrentReservationsComponent implements OnInit {
  cells: number = 1;
  currentReservation?: Reservation;
  reservationIndex = 0;
  reservations!: Reservation[];

  constructor(
    private conformService: AppConfirmService,
    private toastr: ToastrService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.reservationService.getReservationByReserver().subscribe(
      (res) => {
        this.reservations = res;
        this.currentReservation = this.reservations[this.reservationIndex];
      },
      (error: any) => {
        console.log(error);
      }
    );
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
    this.conformService.confirm().subscribe((confirm) => {
      if (confirm) {
        // will delete
        this.toastr.success('Deleted reservation');
        this.ngOnInit();
      }
    });
  }
}
