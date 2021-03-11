import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { CaliberService } from '../../services/caliber.service';
import { BacthDTO } from '../../models/batch-dto';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {
  reservation: Reservation;
  batches: BacthDTO[];
  batchError: string;

  constructor(private reservationService: ReservationService,
    private route: ActivatedRoute,
    private caliberService: CaliberService) {

  }

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

  update(): void {
    this.reservationService.updateReservation(this.reservation);
  }

  getBatches(): void {
    this.caliberService.getAllCurrentBatches().subscribe((batches) => {
      this.batches = batches;
    });
  }

  assignBatch(id: number) {
    this.reservationService.assignBatch(this.reservation, id).subscribe(
      (response) => {
        if (response.status === 200) {
          // route to this route
        }
      },
      (error) => {
        this.batchError = error.error;
        console.log(this.batchError)
      });
  }
}
