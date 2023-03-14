import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Users } from 'src/app/shared/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private auth:AuthenticationService,private router:Router){}
  userMail!:String;
  userName!:string;
  userPass!:string;
  ngOnInit(): void {
    this.auth.uSers();
    
  }
  onSubmit(event: { preventDefault: () => void; }){
    event.preventDefault();
    const newUser = new Users();
    newUser.id = Math.floor(Math.random()*1000); 
    newUser.userMail = this.userMail;
    newUser.userName = this.userName;
    newUser.userPassword = this.userPass;
    //this.nouvelAssignment.emit(newAssignment);
    this.auth.addAssignment(newUser)
    .subscribe(message => console.log(message));
  }  

}
