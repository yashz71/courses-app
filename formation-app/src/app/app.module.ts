import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormationComponent } from './formation/formation.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { FormationDetailComponent } from './formation/formation-detail/formation-detail.component';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { InputValueDirective } from './shared/input-value.directive';
import { LoginPComponent } from './formation/login-p/login-p.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './formation/signup/signup.component';
import { CardsDirective } from './shared/cards.directive';
import { FormationHomeComponent } from './formation-home/formation-home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';


const routes : Routes= [
  {path:'', component:LoginPComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginPComponent},
  {path:'Courses', component:FormationComponent},
  {path:'home', component:FormationHomeComponent},
  {path:'course/:title', component:FormationDetailComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    FormationComponent,
    FormationDetailComponent,
    InputValueDirective,
    LoginPComponent,
    SignupComponent,
    CardsDirective,
    FormationHomeComponent,
    
    
  ],
  
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    CommonModule,
    
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    HttpClientModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSidenavModule,
    FormsModule,
    RouterModule.forRoot(routes),
    
    
    
  
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
