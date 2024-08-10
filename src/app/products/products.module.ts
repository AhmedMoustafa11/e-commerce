import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';





@NgModule({

  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  
   
  ]
})
export class ProductsModule { }
