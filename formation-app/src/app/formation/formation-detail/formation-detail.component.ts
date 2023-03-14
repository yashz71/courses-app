import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/shared/course.service';
import { ActivatedRoute, Router } from '@angular/router';  
import { Courses } from './courses.model';

@Component({
  selector: 'app-formation-detail',
  templateUrl: './formation-detail.component.html',
  styleUrls: ['./formation-detail.component.css']
})
export class FormationDetailComponent implements OnInit{
  coursesP!:Courses;
constructor(private route: ActivatedRoute,
  private router :Router,
  private courseService:CourseService) {}
  ngOnInit(): void {
   
    const title = this.route.snapshot.params['title'];
    this.courseService.getAssignment(title).subscribe(course => this.coursesP =course!);
  }
}
