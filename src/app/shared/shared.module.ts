import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { RouterModule, Routes } from '@angular/router';


import {   HttpClientModule  } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { routes } from '../app.routes';





@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    
    RouterModule.forChild(routes)

    
 
  ],


})
export class SharedModule {


 }

 
   