import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

const routes : Routes= [
  {path:'', component:LoginPComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginPComponent},
  {path:'home', component:FormationComponent},
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
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
