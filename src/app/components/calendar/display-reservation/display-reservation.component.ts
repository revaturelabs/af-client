import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

export interface ReservationDialogData {
  start: number;
  end: number;
  id: number;
  reserver: string;
  roomId: number;
  status: string;
  action?: string;
}


@Component({
  selector: 'app-display-reservation',
  templateUrl: './display-reservation.component.html',
  styleUrls: ['./display-reservation.component.sass']
})
export class DisplayReservationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DisplayReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReservationDialogData,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
