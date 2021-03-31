import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from 'src/app/models/location';
@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.sass'],
})
export class AddLocationComponent implements OnInit {
  // addLocationForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // const name = new FormControl('', Validators.required);
    // const state = new FormControl('', Validators.required);
    // const city = new FormControl('', Validators.required);
    // const zipCode = new FormControl('', Validators.required);

    // this.addLocationForm = this.fb.group({
    //   name,
    //   state,
    //   city,
    //   zipCode,
    // });
  }

  closeDialog(): void {
    // console.log("on submit");
    
    // const name = this.addLocationForm.value.name;
    // const state = this.addLocationForm.value.state;
    // const city = this.addLocationForm.value.city;
    // const zipCode = this.addLocationForm.value.zipCode;
    // this.data = {locationId: 0, name, state, city, zipCode};
    this.dialogRef.close();
  }
}
