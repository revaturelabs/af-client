import { LocationService } from './../../services/location.service';
import { LocationDto } from './../../models/location-dto';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  pulledLocations: LocationDto[];
  searchedLocations: LocationDto[];
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

  searchCity(cityForm): void {
    let city = cityForm.value.searchCity;
    console.log(city);
  }

  async searchState(stateForm): Promise<void> {
    let state = stateForm.value.searchState;
    console.log(state);

    // let sls:Observable<LocationDto[]> =  await this.locationService.getLocationsByState(state);

    // sls.forEach(function (value) {
    //   value.forEach(async function (val) {
    //     let ptest = document.createElement('p');
    //     let vs = await val.state;
    //     ptest.innerText = vs;
    //     document.getElementById('searchedLocations').appendChild(ptest);
    //   }) 
    //   // console.log('State: '+value);

    //   // let idelem = document.createElement('p');
    //   // idelem.innerText = value.id.toString();
    //   // document.getElementById('searchedLocations').appendChild(idelem); 

    //   // let stateelem = document.createElement('p');
    //   // stateelem.append(value.state);
      
    //   // document.getElementById('searchedLocations').appendChild(stateelem);
    // })



    await this.locationService.getLocationsByState(state)
      .subscribe(async (locations: LocationDto[]) => {
        console.log('searching locations');
        
        // this.searchedLocations = locations;
        await locations.forEach(async function (value) {
          console.log('State: '+value.state);
          // let idelem = document.createElement('p');
          // idelem.innerText = value.id.toString();
          let stateelem = document.createElement('p');
          stateelem.append(value.state);
          // document.getElementById('searchedLocations').appendChild(idelem); 
          document.getElementById('searchedLocations').appendChild(stateelem);
        })
      })

    // document.getElementById('searchedLocations').innerHTML
    
    // this.searchedLocations.forEach(function (value) {
    //   let idelem = document.createElement('p');
    //   idelem.innerText = value.id.toString();
    //   let stateelem = document.createElement('p');
    //   stateelem.innerText = value.state;
    //   document.getElementById('searchedLocations').appendChild(idelem); 
    //   document.getElementById('searchedLocations').appendChild(stateelem);
    // })

  }

  searchZip(zipForm): void {
    let zip = zipForm.value.searchZip;
    console.log(zip);
  }

  searchId(idForm): void {
    let id = idForm.value.searchId;
    console.log(id);
  }

}
