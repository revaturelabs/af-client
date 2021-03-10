import { LocationService } from './../../services/location.service';
import { LocationDto } from './../../models/location-dto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  pulledLocations: LocationDto[];
  constructor(private locationService: LocationService, private router: Router) { }

  ngOnInit(): void {
    this.locationService.getAllLocations()
      .subscribe((locations: LocationDto[]) => {
        console.log('getting locations');
        this.pulledLocations = locations;
      });
  }

  backButton(): void {
    this.router.navigateByUrl('');
  }

}
