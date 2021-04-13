import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStep, MatStepper } from '@angular/material/stepper';

import { Building } from 'src/app/models/building';
import { Location } from 'src/app/models/location';
import { Room } from 'src/app/models/room';
import { AppConfirmService } from 'src/app/services/app-confirm/app-confirm.service';
import { BuildingService } from 'src/app/services/building/building.service';
import { LocationService } from 'src/app/services/location/location.service';
import { RoomService } from 'src/app/services/room/room.service';
import { BuildingTableComponent } from '../building-table/building-table.component';
import { CalendarKsComponent } from '../calendar/calendar-ks/calendar-ks.component';
import { LocationTableComponent } from '../location-table/location-table.component';
import { RoomTableComponent } from '../room-table/room-table.component';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.sass'],
})
export class ReservationPageComponent implements OnInit {
  isLinear: boolean = false;

  calendarModes: string[] = ['DCE', 'KS'];
  calendarChoice: number = 0;

  selectedLocation?: Location;
  selectedBuilding?: Building;
  selectedRoom?: Room;

  @ViewChild(LocationTableComponent) locationChild!: LocationTableComponent;
  @ViewChild(BuildingTableComponent) buildingChild!: BuildingTableComponent;
  @ViewChild(RoomTableComponent) roomChild!: RoomTableComponent;
  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild(CalendarKsComponent) calendarChild!: CalendarKsComponent;

  @ViewChild('roomStep') roomStep!: MatStep;

  constructor(
    private _formBuilder: FormBuilder,
    private locationService: LocationService,
    private buildingService: BuildingService,
    private roomService: RoomService,
    public dialog: MatDialog,
    private confirmService: AppConfirmService
  ) {}

  ngOnInit() {}

  initCalendarChild(){
    console.log("Init calendar");
    if (this.calendarChild) {
      this.calendarChild.roomData = this.selectedRoom;
      this.calendarChild.ngOnInit();
    }
  }

  resetBuildingRoom() {
    this.buildingService.currentBuilding = undefined;
    this.selectedBuilding = undefined;
    this.buildingChild.selectedBuilding = undefined;
    this.resetRoom();
  }

  resetRoom() {
    this.roomService.currentRoom = undefined;
    this.selectedRoom = undefined;
    this.roomChild.selectedRoom = undefined;
    this.roomStep.reset();
  }

  getCurrentLocation() {
    this.selectedLocation = this.locationService.currentLocation;
    this.buildingChild.ngOnInit();
    this.stepper.selected.completed = true;
  }

  getCurrentBuilding() {
    this.selectedBuilding = this.buildingService.currentBuilding;
    this.roomChild.ngOnInit();
    this.stepper.selected.completed = true;
  }

  getCurrentRoom() {
    this.selectedRoom = this.roomService.currentRoom;
    this.stepper.selected.completed = true;
    this.initCalendarChild();
  }

  switchCalendar() {
    if (++this.calendarChoice % this.calendarModes.length === 0) {
      this.calendarChoice = 0;
    }
  }
}
