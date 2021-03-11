import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {
  reservation: Reservation;

  constructor(private reservationService: ReservationService,
    private route: ActivatedRoute,
    // private location: Location
    ) { }

  ngOnInit(): void {
    this.getReservation();
  }
  
  async getReservation():Promise<void> {
    const id = await this.route.snapshot.paramMap.get('reservationId');
    console.log(id)
      this.reservationService.getReservationById(parseInt(id))
        .subscribe(reservation => this.reservation = reservation);
  }

  async delete(): Promise<void>{
    //const id = await this.route.snapshot.paramMap.get('reservationId');
    let res: any ;
    this.reservationService.deleteReservation(this.reservation.reservationId)
    .subscribe(response => {res = response});
    console.log(res);
  }

  async update(): Promise<void> {
    this.reservationService.updateReservation(this.reservation)
    .subscribe(resertion => this.reservation = resertion);
  }

}
