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
  // someMethod() {
  //   this.trigger.openMenu();
  // }


  ngOnInit(): void {
  }

}
