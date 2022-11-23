import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

export interface ReservationDialogData {
  start: number;
  end: number;
  id: number;
  reserver: string;
  title: string;
  reservationTitle: string;
  roomId: number;
  status: string;
  action?: string;
}

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.sass'],
})
export class EditReservationComponent implements OnInit {
  editReservationForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReservationDialogData,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const title = new FormControl(this.data.reservationTitle, Validators.required);
    const start = new FormControl(this.data.start, Validators.required);
    const end = new FormControl(this.data.end, Validators.required);
    this.editReservationForm = this.fb.group({
      title,
      start,
      end,
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm() {
    if (this.readFormData()) {
      delete this.data.action;
      this.dialogRef.close(this.data);
    } else {
      this.toastr.warning('Invalid input');
    }
  }

  readFormData(): boolean {
    const valid = this.editReservationForm.valid;
    const reservationTitle = this.editReservationForm.value.title;
    const start = this.editReservationForm.value.start;
    const end = this.editReservationForm.value.end;
    this.data = { ...this.data, reservationTitle, start, end };
    return valid;
  }
}
