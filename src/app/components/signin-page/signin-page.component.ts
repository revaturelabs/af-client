import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegSuccessDialogComponent } from '../reg-success-dialog/reg-success-dialog.component';
import { ToastrService } from 'ngx-toastr';

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
  errMsg: string = '';
  errMsgSignIn: string = '';
  accountType: string = '2';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.getCurrentUserInfo();
      if (this.authService.decodedJwtDTO?.role == 'admin') {
        this.router.navigateByUrl('/admin-page');
      } else {
        this.router.navigateByUrl('/trainer-page');
      }
    }
  }

  openDialog(): void {
    const dialogref = this.dialog.open(RegSuccessDialogComponent, {
      data: { name: this.registerEmail },
    });
  }

  async signin() {
    this.errMsgSignIn = '';
    if (!this.validateSignIn()) {
      return;
    }
    const user: User = new User();
    user.email = this.email;
    user.password = this.pw;
    try {
      const jwt = await this.authService.signInUser(user);
      localStorage.setItem('Authorization', jwt);
      location.reload();
    } catch (err) {
      console.log(err);
      this.toastr.error('Sign In Failure');
    } finally {
      this.resetInputs();
    }
  }

  async signup() {
    this.errMsg = '';
    if (!this.validateSignUp()) {
      return;
    }

    const user: User = new User();
    user.email = this.registerEmail;
    user.status = 'pending';
    if (this.accountType == '2') {
      user.role = 'trainer';
    } else {
      user.role = 'admin';
    }

    try {
      const signedInUser = await this.authService.registerUser(user);
      this.openDialog();
    } catch (err) {
      console.log(err);
      this.toastr.error(
        err.error?.message ? err.error.message : err.message,
        'Registration Failure'
      );
    } finally {
      this.resetInputs();
    }
  }

  resetInputs(): void {
    this.registerEmail = '';
    this.email = '';
    this.pw = '';
  }

  validateSignIn(): boolean {
    if (this.email === '' || this.pw === '') {
      this.errMsgSignIn = 'All fields are required';
      return false;
    }
    return true;
  }

  validateSignUp(): boolean {
    let clean = true;
    if (this.registerEmail === '') {
      clean = false;
    }
    if (!this.validateEmail()) {
      clean = false;
    }
    if (!clean) {
      this.errMsg = 'Please enter a valid email address';
    }
    return clean;
  }

  validateEmail(): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.registerEmail).toLowerCase());
  }
}
