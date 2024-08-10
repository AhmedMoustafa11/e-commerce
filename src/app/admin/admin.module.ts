import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { FormsModule } from '@angular/forms';







@NgModule({

  imports: [
    CommonModule,HttpClientModule, FormsModule, 

    RouterModule.forChild(routes)

 
  ]


})
export class AdminModule { }
