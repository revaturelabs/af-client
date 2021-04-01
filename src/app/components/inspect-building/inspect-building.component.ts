import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Building } from 'src/app/models/building';
import { AppConfirmService } from 'src/app/services/app-confirm/app-confirm.service';
import { BuildingService } from 'src/app/services/building/building.service';
import { LocationService } from 'src/app/services/location/location.service';
import { AddBuildingComponent } from '../add-building/add-building.component';

@Component({
  selector: 'app-inspect-building',
  templateUrl: './inspect-building.component.html',
  styleUrls: ['./inspect-building.component.sass'],
})
export class InspectBuildingComponent implements OnInit, AfterViewInit {

  @Input() locationData?: Location;
  selectedBuilding?: Building;
  buildingData?: Building;

  displayedColumns: string[] = [
    'buildingId',
    'address',
    'roomCount',
    'actions',
  ];
  dataSource!: MatTableDataSource<Building>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private locationService: LocationService,
    private buildingService: BuildingService,
    private confirmService: AppConfirmService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.createTable();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createTable(): void {
    this.buildingService
      .getBuildingsByLocationId(
        this.locationService.currentLocation?.locationId!
      )
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editBuilding(building: Building) {
    this.buildingData = building;
    this.openDialog("Edit location");
  }

  deleteBuilding(building: Building) {
    this.confirmService
      .confirm({
        message: `Delete ${building.buildingId}`,
        title: 'Delete building',
      })
      .subscribe((confirm) => {
        if (confirm) {
          console.log('Delete ', location);
          this.buildingService
            .deleteBuildingById(building.buildingId!)
            .subscribe((res) => {
              console.log('res from delete building', res);
            });
        }
      });
  }

  chooseBuilding(building: Building) {
    this.selectedBuilding = building;
    this.buildingService.currentBuilding = building;
  }

  addBuilding() {
    this.buildingData = { locationId: this.locationService.currentLocation?.locationId };
    this.openDialog("Add location");
  }

  openDialog(title: string) {
    const dialogRef = this.dialog.open(AddBuildingComponent, {
      data: { ...this.buildingData, title },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("dialog return", result);
    });
  }
}
