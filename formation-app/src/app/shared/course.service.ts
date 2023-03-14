import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Courses } from '../formation/formation-detail/courses.model';
import { map, Observable,of, tap, catchError } from 'rxjs';
import { data } from './data';
import { forkJoin } from 'rxjs';
import { Users } from './users.model';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  url ="http://localhost:8010/api/courses";
  
  private httpOptions = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  courses!: Courses[];


  getAssignments(): Observable<Courses[]>{
    return this.http.get<Courses[]>(this.url);


  }
  getAssignmentsPagine(page:number, limit:number): Observable<any>{
    return this.http.get<any>(this.url +"?page="+page+"&limit="+limit);

  }

  getAssignment(title: String):Observable<Courses|undefined>{
    return this.http.get<Courses|undefined>(this.url+"/" +title)

    

    .pipe(
      map( (a:any)=>{
        a.nom += "recu et transformer avec une pipe";
        return a;
      }),
      tap(_ =>{
        console.log("tap:assignment avec id="+title+"requete envoyer sur mongoDB cloud");

      }),
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + title))
    );
  }
  
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };



  addAssignment(course:Courses):Observable<any>{
    return this.http.post<Courses>(this.url, course, this.httpOptions);
   
  }

  peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];
 
    data.forEach(a => {
      const nouvelAssignment = new Courses();
      nouvelAssignment.id = a.id;
      nouvelAssignment.title= a.title.toLowerCase();
      nouvelAssignment.desc = a.desc;
      nouvelAssignment.img = a.img;
 
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    
    return forkJoin(appelsVersAddAssignment);
  }
}
