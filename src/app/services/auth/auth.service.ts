import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = "http://localhost:8080/"
  constructor(private httpClient:HttpClient) { }

  /*
    register user
    get pending users
    approve/deny pending users
    get jwt for user
    verify jwt
  */

    async registerUser(user:User){
      const returnedUser:User = await this.httpClient.post<User>(this.url+"register", user).toPromise()
      return returnedUser;
    }

    async signInUser(user:User){      
      const jwt:{data:string} = await this.httpClient.post<{data:string}>(this.url+"login", user).toPromise()
      return jwt.data;
    }

    isLoggedIn():boolean{
      return (localStorage.getItem("Authorization") != null)
    }

}
