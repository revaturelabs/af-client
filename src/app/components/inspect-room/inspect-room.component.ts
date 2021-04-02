import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/models/room';
import { AppConfirmService } from 'src/app/services/app-confirm/app-confirm.service';
import { BuildingService } from 'src/app/services/building/building.service';
import { LocationService } from 'src/app/services/location/location.service';
import { RoomService } from 'src/app/services/room/room.service';
import { AddRoomComponent } from '../add-room/add-room.component';

@Component({
  selector: 'app-inspect-room',
  templateUrl: './inspect-room.component.html',
  styleUrls: ['./inspect-room.component.sass']
})
export class InspectRoomComponent implements OnInit, AfterViewInit {

  roomData?: Room;
  
  displayedColumns: string[] = [
    'roomId',
    'name',
    'type',
    'capacity',
    'actions'
  ];
  dataSource!: MatTableDataSource<Room>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() buildingDataInput?: string;

  constructor(
    private locationService: LocationService,
    public dialog: MatDialog,
    private confirmService: AppConfirmService,
    private roomService: RoomService,
    private buildingService: BuildingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createTable(): void {
    this.roomService.getRoomByBuilding(this.buildingService.currentBuilding!).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRoom(room: Room) {
    this.roomData = room;
    this.openDialog("Edit room");
  }

  deleteRoom(room: Room) {
    this.confirmService
      .confirm({ message: `Delete room id: ${room.roomId}`, title: 'Delete room' })
      .subscribe((confirm) => {
        if (confirm) {
          this.roomService.deleteRoom(room).subscribe(
            (res) => {
              this.toastr.success('Deleted room');
            },
            (error) => {
              this.toastr.error(error?.error?.message || error?.error?.error);
            }
          );
        }
      });
  }


  addRoom() {
    this.roomData = { buildingId: this.buildingService.currentBuilding?.buildingId, roomId: 0 };
    this.openDialog("Add room");
  }

  openDialog(title: string) {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      data: { ...this.roomData, title },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.roomId == 0) {
        this.roomService.createRoom(result).subscribe(
          (res) => {
            this.toastr.success('Created new room');
          },
          (error) => {
            this.toastr.error(error?.error?.message || error?.error?.error);
          }
        );
      } else if (result?.roomId) {
        this.roomService.updateRoom(result).subscribe(
          (res) => {
            this.toastr.success('Updated room');
          },
          (error) => {
            this.toastr.error(error?.error?.message || error?.error?.error);
          }
        );
      }
    });
  }


}
