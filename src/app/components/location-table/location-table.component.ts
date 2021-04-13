import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  zipCode?: string;
  locationData?: Location;

  displayedColumns: string[] = ['name', 'state', 'city', 'zipCode'];
  dataSource!: MatTableDataSource<Location>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.createTable();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      //TODO sorting has problem
      this.dataSource.sort = this.sort;
    }
  }

  createTable(): void {
    this.locationService.getAllLocation().subscribe((res) => {
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

  chooseLocation(loc: Location) {
    console.log('Select location: ', loc);
    this.selectedLocation = loc;
    this.locationService.currentLocation = loc;
  }
}
