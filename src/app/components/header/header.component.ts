import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  
  //Need service method to check if User is Logged in

  loggedIn:boolean = false;

  logout(){
    this.loggedIn = false;
  }
  

  ngOnInit(): void {
  }

}
