import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass']
})
export class NotFoundComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  homepage(){
    this.router.navigateByUrl('/dashboard');
  }

}
