import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { RouterModule, Routes } from '@angular/router';

import { UserService } from './service/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { userGuard } from './guard/user.guard';
import { routes } from '../app.routes';






@NgModule({

  


  imports: [
    CommonModule,HttpClientModule,BrowserModule,
    RouterModule.forChild(routes) 


  ],
    
  providers:[UserService,HttpClient,HttpClientModule,],



})
export class UserModule { }
