import { Component, OnInit } from '@angular/core';
import { Courses } from './formation-detail/courses.model';
import { CourseService } from '../shared/course.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { CardsDirective } from '../shared/cards.directive';
import {PageEvent} from '@angular/material/paginator';
@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  constructor(private coursesService:CourseService,
    private router :Router,
    ) {}
    page: number=1;
    limit: number=3;
    totalDocs!: number;
    totalPages!: number;
    hasPrevPage!: boolean;
    prevPage!: number;
    hasNextPage!: boolean;
    nextPage!: number;
    inDex=1;
    hidePageSize = true;
    showPageSizeOptions = false;
    showFirstLastButtons = true;
    disabled = false;
    
    
  
  courses: Courses[]=[];

  ngOnInit(): void {
    this.getAssignments()
  }
  indexPlus(){
    if(this.hasNextPage){
      this.page=this.nextPage;
      this.inDex+=1;
      this.getAssignments();
    }
    


  }
  indexMin(){
    if(this.hasPrevPage){
      this.page=this.prevPage;
      this.inDex-=1;
      this.getAssignments();
    }

  }
 
  getAssignments(){
    this.coursesService.getAssignmentsPagine(this.page, this.limit)
     .subscribe((data:any) => {
       this.courses = data.docs;
       this.page = data.page;
       this.limit = data.limit;
       this.totalDocs = data.totalDocs;
       this.totalPages = data.totalPages;
       this.hasPrevPage = data.hasPrevPage;
       this.prevPage = data.prevPage;
       this.hasNextPage = data.hasNextPage;
       this.nextPage = data.nextPage;
       console.log("données reçues");
     });
    }
    pageSuivante(){
      if(this.hasNextPage){
        this.page=this.nextPage;
        this.getAssignments();
      }
    }
    pagePrecedente(){
      if(this.hasPrevPage){
        this.page=this.prevPage;
        this.getAssignments();
      }
    }
    peuplerBD() {
      // version naive et simple
      //this.assignmentsService.peuplerBD();
   
      // meilleure version :
      this.coursesService.peuplerBDavecForkJoin()
     .subscribe(() => {
       console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES,ON RE-AFFICHE LA LISTE");
	// replaceUrl = true = force le refresh, même si
	// on est déjà sur la page d’accueil
// Marche plus avec la dernière version d’angular
       this.router.navigate(["/home"], {replaceUrl:true});
     })

    }
   
}
