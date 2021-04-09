import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-app-loader',
  templateUrl: './app-loader.component.html',
})
export class AppLoaderComponent implements OnInit {
  title: string = '';
  message: string = '';
  constructor(public dialogRef: MatDialogRef<AppLoaderComponent>) {}

  ngOnInit() {
  }

}