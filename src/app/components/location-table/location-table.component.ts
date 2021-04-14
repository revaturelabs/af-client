import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.sass'],
})
export class LocationTableComponent implements OnInit {
  selectedLocation?: Location;

  locationId?: number;
  name?: string;
  state?: string;
  city?: string;
  zipcode?: string;
  locationData?: Location;

  displayedColumns: string[] = ['name', 'state', 'city', 'zipcode'];
  dataSource!: MatTableDataSource<Location>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private locationService: LocationService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createTable();
  }

  createTable(): void {
    this.locationService.getAllLocation().subscribe(
      res => {
        this.setTableData(res);
      },
      error => {
        this.toastr.error('Failed to load location data');
      }
    )
  }
  
  setTableData(data: Location[]) {
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

  chooseLocation(loc: Location) {
    this.selectedLocation = loc;
    this.locationService.currentLocation = loc;
  }
}
