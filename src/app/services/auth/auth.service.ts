import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import jwt_decode from 'jwt-decode';

export interface JwtDTO {
  data?: string;
}
export interface DecodedJwtDTO {
  id?: number;
  email?: string;
  role?: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:8080/';
  decodedJwtDTO?: DecodedJwtDTO;

  constructor(private httpClient: HttpClient) {}

  /*
    register user
    get pending users
    approve/deny pending users
    get jwt for user
    verify jwt
  */

  async registerUser(user: User) {
    const returnedUser: User = await this.httpClient
      .post<User>(this.url + 'register', user)
      .toPromise();
    return returnedUser;
  }

  async signInUser(user: User) {
    const jwt: { data: string } = await this.httpClient
      .post<{ data: string }>(this.url + 'login', user)
      .toPromise();
    return jwt.data;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('Authorization') != null;
  }

  // check the role of current user to be admin
  isAdminAuthorized(): boolean {
    return true;
    this.getCurrentUserInfo();
    return this.isLoggedIn() && this.decodedJwtDTO!.role == 'admin';
  }

  isTrainerAuthorized(): boolean {
    return true;
    this.getCurrentUserInfo();
    return this.isLoggedIn() && this.decodedJwtDTO!.role == 'trainer';
  }

  getCurrentUserInfo() {
    let value = localStorage.getItem('Authorization');
    let user: JwtDTO | undefined;
    if (value != null) {
      try {
        user = JSON.parse(value!);
        this.decodedJwtDTO = jwt_decode(user?.data!);
      } catch (e) {
        user = undefined;
      }
    }
  }

}
