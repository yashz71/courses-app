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
    res!:boolean | String;
    users!:Users[];
  ngOnInit(): void {
    
   this.userFormGroup=this.fb.group({
    username :this.fb.control(""),
    password : this.fb.control("")
   })   
  }
  handleLogin(){
    const username:string = this.userFormGroup.value.username;
    const password:String = this.userFormGroup.value.password;
   

    this.auth.login(username,password).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
       
      },
      err => console.log(err)
    ) ;
    
    
   
  }
  userName!:string;
userPass!:string;
goSignUp(){
  this.router.navigate(["/signup/"]);
}

}