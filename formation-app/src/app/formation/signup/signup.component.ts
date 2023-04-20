import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Users } from 'src/app/shared/users.model';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private auth:AuthenticationService,private router:Router){}
  userMail!:String;
  userName!:string;
  userPass!:String; 
  values!:String;
  cform=false;
  i!:number;
  sp:number=0;
  err!:string;
  ngOnInit(): void {
    
    
  }
  throwErr(): never {
    throw new Error('Something went wrong');
  }
  onKey(a:String) { // with type info
    for(this.i=0;this.i<=a.length;this.i++){
      if (a[this.i]== "!" || a[this.i]== "@" || a[this.i]== "#" ||a[this.i]== "$" || a[this.i]== "%" || a[this.i]== "^" || a[this.i]== "&" || a[this.i]== "*" ){
        this.sp=1;
        break;
      
      }
}
    if(a.length<10 || this.sp==0){
      
      this.throwErr();
    }
  }
  
  
  onSubmit(event: { preventDefault: () => void; }){
    event.preventDefault();
    const newUser = new Users();
    newUser.userMail = this.userMail;
    newUser.userName = this.userName;
    newUser.userPassword = this.userPass;
    //this.nouvelAssignment.emit(newAssignment);
    this.auth.addUser(newUser)
    .subscribe(message => this.err=message );
  }  

}
