import { Component } from '@angular/core';
import { CourseService } from './shared/course.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Courses } from './formation/formation-detail/courses.model';
import { find } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
 nom!: String;
  ID!: Number;
  title: any;
  
 
  constructor(
    private router :Router,){}
    onSubmit() {
      
      this.router.navigate(["/course/"+this.nom.toLowerCase()]);
      console.log(this.nom.toLowerCase())

    }
   
}
