import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.sass'],
})
export class SigninPageComponent implements OnInit {
  email: string = '';
  hide: boolean = true;
  pw: string = '';

  constructor() {}

  ngOnInit(): void {}

  signin() {}

  signup() {}
}
