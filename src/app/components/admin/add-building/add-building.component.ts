import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

export interface BuildingDialogData {
  locationId?: number;
  address?: string;
  buildingId?: number;
  title?: String;
}

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.sass'],
})
export class AddBuildingComponent implements OnInit {
  addBuildingForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBuildingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BuildingDialogData,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const address = new FormControl(this.data.address, Validators.required);
    this.addBuildingForm = this.fb.group({
      address,
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm() {
    if (this.readFormData()) {
      delete this.data.title;
      this.dialogRef.close(this.data);
    } else {
      this.toastr.warning('Invalid input');
    }
  }

  readFormData(): boolean {
    const valid = this.addBuildingForm.valid;
    const address = this.addBuildingForm.value.address;
    this.data = { ...this.data, address };
    return valid;
  }
}
