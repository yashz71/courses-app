import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-formation-home',
  templateUrl: './formation-home.component.html',
  styleUrls: ['./formation-home.component.css']
})
export class FormationHomeComponent {
  constructor(private router :Router,){}
  goCourse(){
    this.router.navigate(["/Courses"]);
  }
}
