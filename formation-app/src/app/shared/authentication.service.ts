import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError,  mapTo, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Users } from './users.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { map } from 'rxjs/operators';
const saltRounds =10;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url_signin= "http://localhost:8080/api/signin";
  url_signup= "http://localhost:8080/api/signup"; 
  username!: String;
  password!:string;
  
  
  constructor(private http:HttpClient) {
   
     }
  private httpOptions = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  users!: Users[];
  
   
  
login(userName: string, userPassword: String):Observable<any> {
        return this.http.post<any>(this.url_signin, { userName, userPassword })
           
    }

  addUser(user:Users):Observable<any>{
   return this.http.post<Users>(this.url_signup, user, this.httpOptions);
    
  }
   
  }
