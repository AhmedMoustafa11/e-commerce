import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Router } from 'express';
import { Iproduct } from '../../../model/iproduct';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,SpinnerComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent   implements OnInit {


 

  product: Iproduct | null =null


  currentPrdId:number=0;

  loading:boolean=false


constructor(private productsService :ProductsService,private activatedRoute:ActivatedRoute)
{


    
}



ngOnInit(): void {


  this.activatedRoute.paramMap.subscribe((paramMap)=>{
  
    this.currentPrdId=Number(paramMap.get('pid'))


  })

  
  this.productsService.getProductById(this. currentPrdId).subscribe(prd=>{

       
    this.product=prd
 
  })


}






 


}






