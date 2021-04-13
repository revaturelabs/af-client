import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Building } from 'src/app/models/building';
import { AppConfirmService } from 'src/app/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'src/app/services/app-loader/app-loader.service';
import { BuildingService } from 'src/app/services/building/building.service';
import { LocationService } from 'src/app/services/location/location.service';
import { RoomService } from 'src/app/services/room/room.service';
import { AddBuildingComponent } from '../add-building/add-building.component';

interface BuildingWithRoomCount {
  buildingId?: number;
  address?: string;
  roomCount?: number;
}

@Component({
  selector: 'app-inspect-building',
  templateUrl: './inspect-building.component.html',
  styleUrls: ['./inspect-building.component.sass'],
})
export class InspectBuildingComponent implements OnInit {
  @Input() locationData?: string;
  selectedBuilding?: Building;
  buildingData?: Building;
  displayedColumns: string[] = [
    'buildingId',
    'address',
    'roomCount',
    'actions',
  ];
  dataSource!: MatTableDataSource<BuildingWithRoomCount>;
  resBuilding!: BuildingWithRoomCount[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private locationService: LocationService,
    private buildingService: BuildingService,
    private confirmService: AppConfirmService,
    public dialog: MatDialog,
    private roomService: RoomService,
    private toastr: ToastrService,
    private loader: AppLoaderService
  ) {}

  ngOnInit(): void {}

  createTable(): void {
    this.loader.open();
    this.buildingService
      .getBuildingsByLocationId(
        this.locationService.currentLocation?.locationId!
      )
      .subscribe(
        (res) => {
          let arr: BuildingWithRoomCount[] = res as BuildingWithRoomCount[];
          arr.forEach((building) => {
            this.roomService.getRoomByBuilding(building).subscribe(
              (res) => (building.roomCount = res.length),
              (error) => {
                this.toastr.error(error?.error?.message || error?.error?.error);
              }
            );
          });
          this.setTableData(arr);
          this.resBuilding = arr;
          this.loader.close();
        },
        (error) => {
          this.toastr.error(error?.error?.message || error?.error?.error);
          this.loader.close();
        }
      );
  }

  setTableData(data: BuildingWithRoomCount[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.openDialog('Edit location');
  }

  deleteBuilding(building: Building) {
    this.confirmService
      .confirm({
        message: `Delete ${building.buildingId}`,
        title: 'Delete building',
      })
      .subscribe((confirm) => {
        if (confirm) {
          this.loader.open();
          this.buildingService
            .deleteBuildingById(building.buildingId!)
            .subscribe(
              (res) => {
                this.resBuilding = this.resBuilding.filter(
                  (b) => b.buildingId !== building.buildingId
                );
                this.setTableData(this.resBuilding);
                this.toastr.success('Building deleted');
                this.loader.close();
              },
              (error) => {
                this.toastr.error(error?.error?.message || error?.error?.error);
                this.loader.close();
              }
            );
        }
      });
  }

  chooseBuilding(building: Building) {
    this.selectedBuilding = building;
    this.buildingService.currentBuilding = building;
  }

  unChooseBuilding() {
    this.selectedBuilding = {};
  }

  addBuilding() {
    this.buildingData = {
      locationId: this.locationService.currentLocation?.locationId,
      buildingId: 0,
    };
    this.openDialog('Add location');
  }

  openDialog(title: string) {
    const dialogRef = this.dialog.open(AddBuildingComponent, {
      data: { ...this.buildingData, title },
    });
    dialogRef.afterClosed().subscribe((result: BuildingWithRoomCount) => {
      if (result?.buildingId == 0) {
        this.loader.open();
        this.buildingService.createBuilding(result).subscribe(
          (res) => {
            this.loader.close();
            this.resBuilding.push(result);
            this.setTableData(this.resBuilding);
            this.toastr.success('Created new building');
          },
          (error) => {
            this.loader.close();
            this.toastr.error(error?.error?.message || error?.error?.error);
          }
        );
      } else if (result?.buildingId) {
        this.loader.open();
        this.buildingService.updateBuilding(result).subscribe(
          (res) => {
            this.loader.close();
            this.resBuilding = this.resBuilding.map((b) =>
              b.buildingId == result.buildingId ? result : b
            );
            this.setTableData(this.resBuilding);
            this.toastr.success('Updated building');
          },
          (error) => {
            this.toastr.error(error?.error?.message || error?.error?.error);
            this.loader.close();
          }
        );
      }
    });
  }
}
