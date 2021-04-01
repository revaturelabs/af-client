import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddBuildingComponent, BuildingDialogData } from '../add-building/add-building.component';

export interface RoomDialogData {
  roomId?: number;
  name?: string;
  type?: number;
  capacity?: number;
  buildingId?: number;
  title?: String;
}

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.sass']
})
export class AddRoomComponent implements OnInit {

  
  addRoomForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBuildingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomDialogData,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const name = new FormControl(this.data.name, Validators.required);
    const type = new FormControl(this.data.type, Validators.required);
    const capacity = new FormControl(this.data.capacity, Validators.required);

    this.addRoomForm = this.fb.group({
      name, type, capacity
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
      console.log('Invalid form data');
    }
  }

  readFormData(): boolean {
    const valid = this.addRoomForm.valid;
    const name = this.addRoomForm.value.name;
    const type = this.addRoomForm.value.type;
    const capacity = this.addRoomForm.value.capacity;
    this.data = { ...this.data, roomId: 0, name, type, capacity };
    console.log("data", this.data, name, type, capacity);
    
    return valid;
  }


}
