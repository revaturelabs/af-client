import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.sass'],
})
export class SigninPageComponent implements OnInit {
  email: string = '';
  registerEmail: string = '';
  hide: boolean = true;
  pw: string = '';

  constructor(private authService:AuthService, private router:Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn())
      this.router.navigateByUrl("/");
    
  }

  /*
    userId?: number;
    email?: string;
    password?: string;
    status?: string;
    role?: string;
  */
  async signin() {
    const user:User = new User();
    user.email = this.email;
    user.password = this.pw;
    const jwt = await this.authService.signInUser(user);
    
    localStorage.setItem("Authorization", jwt);
    location.reload();
  }

  async signup() {
    const user:User = new User();
    user.email = this.registerEmail;
    user.status = "pending";
    user.role = "trainer"

    const signedInUser = await this.authService.registerUser(user);
    console.log(signedInUser);

    // TODO Forward to a "you have successfully registered page. Please check your email."
  }
}
