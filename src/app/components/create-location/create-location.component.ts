import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Building } from 'src/app/models/building';
import { Location } from 'src/app/models/location';
import { BuildingService } from 'src/app/services/building/building.service';
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
  currentBuilding?: Building;

  constructor(private locationService: LocationService,
    private _formBuilder: FormBuilder, 
    private buildingService: BuildingService) { }

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
  
  getCurrentBuilding() {
    this.currentBuilding = this.buildingService.currentBuilding;
  }

  reInitBuildingPage() {
    this.child.ngOnInit();
  }

}
