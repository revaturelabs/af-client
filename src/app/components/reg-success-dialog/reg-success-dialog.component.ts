import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-reg-success-dialog',
  templateUrl: './reg-success-dialog.component.html',
  styleUrls: ['./reg-success-dialog.component.sass'],
})
export class RegSuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RegSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
