import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Building } from 'src/app/models/building';
import { Location } from 'src/app/models/location';
import { BuildingService } from 'src/app/services/building/building.service';
import { LocationService } from 'src/app/services/location/location.service';
import { InspectBuildingComponent } from '../inspect-building/inspect-building.component';
import { InspectRoomComponent } from '../inspect-room/inspect-room.component';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.sass']
})
export class CreateLocationComponent implements OnInit {

  @ViewChild(InspectBuildingComponent) buildingChild!:InspectBuildingComponent;
  @ViewChild(InspectRoomComponent) roomChild!:InspectRoomComponent;

  currentLocation?: Location;
  currentBuilding?: Building;
  completeLocationSelect: boolean = false;
  completeBuildingSelect: boolean = false;


  constructor(private locationService: LocationService,
    private _formBuilder: FormBuilder, 
    private buildingService: BuildingService) { }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.currentLocation = this.locationService.currentLocation;
    this.completeLocationSelect = !!this.currentLocation?.locationId;
  }
  
  getCurrentBuilding() {
    this.currentBuilding = this.buildingService.currentBuilding;
    this.completeBuildingSelect = !!this.currentBuilding?.buildingId;
  }

  reInitBuildingPage() {
    this.buildingChild.ngOnInit();
  }

  reInitRoomPage() {
    this.roomChild.ngOnInit();
  }

}
