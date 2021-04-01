import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';
import { InspectBuildingComponent } from '../inspect-building/inspect-building.component';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.sass']
})
export class CreateLocationComponent implements OnInit {

  @ViewChild(InspectBuildingComponent) child!:InspectBuildingComponent;
  firstFormGroup!: FormGroup;
  currentLocation?: Location;

  constructor(private locationService: LocationService,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  test() {
    console.log(this.locationService.currentLocation);
    
  }

  getCurrentLocation() {
    this.currentLocation = this.locationService.currentLocation;
  }
  
  reInitBuildingPage() {
    this.child.ngOnInit();
  }

}
