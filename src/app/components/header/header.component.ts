import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  loggedIn = true;

  constructor(private authService:AuthService, private router:Router) { 
  }

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  
  //Need service method to check if User is Logged in

  logout(){
    localStorage.removeItem("Authorization");
    location.reload();
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()){
      this.router.navigateByUrl("/signin");
      this.loggedIn = false;
    }
  }

}
