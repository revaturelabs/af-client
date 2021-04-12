import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.sass']
})
export class SetPasswordComponent implements OnInit {
  newPassword:string = "";
  newPasswordConfirm:string = "";
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }


  changePassword() {
    console.log("New Password:", this.newPassword);
    console.log("New Password Confirmation:", this.newPasswordConfirm);
    if(this.newPassword !== this.newPasswordConfirm) {
      console.log("Passwords must match");
      return;
    }
    this.authService.setPassword(this.newPassword).subscribe(
    data => {
      console.log(data);
    }, 
    error => {
      console.log(error);
    });
  }
}
