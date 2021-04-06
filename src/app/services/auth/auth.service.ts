import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';

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
  url: string = 'http://35.232.107.40:8080/';
  decodedJwtDTO?: DecodedJwtDTO = { id: 1, email: 'test@test.com', role: 'trainer'};

  pendingUsers: User[] = [
    {userId: 1, email: 'user1@g.com', password: '', status: 'PENDING', role: 'trainer'},
    {userId: 2, email: 'user2@g.com', password: '', status: 'PENDING', role: 'trainer'},
    {userId: 3, email: 'user3@g.com', password: '', status: 'PENDING', role: 'trainer'},
    {userId: 4, email: 'user4@g.com', password: '', status: 'PENDING', role: 'trainer'},
    {userId: 5, email: 'user5@g.com', password: '', status: 'PENDING', role: 'trainer'},
    {userId: 6, email: 'user6@g.com', password: '', status: 'PENDING', role: 'trainer'},
    {userId: 7, email: 'user7@g.com', password: '', status: 'PENDING', role: 'trainer'},
    {userId: 8, email: 'user8@g.com', password: '', status: 'PENDING', role: 'trainer'},
  ]

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

  async setPassword(password: string) {
    const jwt: {data : string} = await this.httpClient
      .post<{data: string}>(this.url+"/password", password)
      .toPromise();
    return jwt.data;
  }

  getAllPendingUsers(): Observable<User[]> {
    return of(this.pendingUsers);
  }

  resolveUser(user: User):Observable<User> {
    return of(user);
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
        console.log(this.decodedJwtDTO);
      } catch (e) {
        user = undefined;
      }
    }
  }


}
