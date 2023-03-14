import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Users } from 'src/app/shared/users.model';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login-p',
  templateUrl: './login-p.component.html',
  styleUrls: ['./login-p.component.css']
})
export class LoginPComponent implements OnInit{
userFormGroup!: FormGroup;
  constructor(private auth:AuthenticationService,private router :Router,
    private fb:FormBuilder){}
    users!:Users[];
  ngOnInit(): void {
    this.auth.uSers();
   this.userFormGroup=this.fb.group({
    username :this.fb.control(""),
    password : this.fb.control("")
   })   
  }
  handleLogin(){
    const username = this.userFormGroup.value.username;
    const password = this.userFormGroup.value.password;
   

    this.auth.log(username,password).subscribe(m=> console.log(m));

   
  }
  userName!:string;
userPass!:string;
goSignUp(){
  this.router.navigate(["/signup/"]);
}
  onSubmit(){
    const name="moha";
    const pass="63f4dfa9e1df94ec"

   // this.auth.login(this.userName,this.userPass).subscribe(m=> console.log(m));

  }}
