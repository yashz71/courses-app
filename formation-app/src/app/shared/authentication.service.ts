import { Injectable } from '@angular/core';
import { catchError, map, mapTo, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Users } from './users.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
const saltRounds =10;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url_user= "http://localhost:8080/api/users";
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
  
  getusers():Observable<Users[]>{
    return this.http.get<Users[]>(this.url_user)
    
    
  }
  uSers(){
    this.getusers()
    .subscribe((data:any) => {
      this.users = data.docs;
     
    });
  }
  
  
/*
  login(username:string, password:string):Observable<Users>{
    if (this.users.length === 0) {
      return this.loadUsersFromOtherServer().pipe(
        switchMap(() => this.findAndAuthenticateUser(username, password))
      );
    } else {
      return this.findAndAuthenticateUser(username, password);
    }
  }
  
  private findAndAuthenticateUser(username: string, password: string): Observable<Users> {
    if (!this.users.length) {
      return this.loadUsersFromOtherServer().pipe(
        switchMap(() => this.findAndAuthenticateUser(username, password))
      );
    }
  
    let user = this.users.find(u => u.userName === username);
    if (!user) {
      return throwError(() => new Error('bad username'));
    }
  
    if (!bcrypt.compareSync(password, user.userPassword)) {
      return throwError(() => new Error('bad credentials'));
    }
  
    return of(user);
  }
  */
 
   log(username:String, password:string):Observable<boolean>{
    
    
    let user= this.users.find(u  => u.userName == username);
    if(!user){ console.log(username); return throwError(()=> new Error("bad username"));}
    if(!bcrypt.compareSync(password, user.userPassword)) {
      return throwError(()=> new Error("bad credentials"));
    }
    
    
    return of(true);
}

  

  logiin(name:any,pass:any){
    this.users.forEach(a=> {if(a.userName.toLocaleLowerCase()!=name.toLocaleLowerCase()){
      console.log("wtf");

    }
  if(a.userPassword!=bcrypt.hashSync(pass)){
    console.log("WTFF");
  }})

  }

  addAssignment(user:Users):Observable<any>{
    user.userPassword = bcrypt.hashSync(user.userPassword,8)
   let existeUser= this.users.find(u  => u.userMail == user.userMail);
    if(existeUser){
      return throwError(()=> new Error("already used"));
    }
    if(!existeUser){
   return this.http.post<Users>(this.url_user, user, this.httpOptions);
    }
    return of(user)
  }
   
  }
