import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';







@NgModule({
 
  imports: [
    CommonModule,
    RouterModule.forChild(routes)



  ],

 providers:[HttpClient,HttpClientModule]

})
export class CartModule { }
