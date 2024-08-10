import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { Iproduct } from '../../../model/iproduct';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../../products/service/products.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-adminprofile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink,RouterLinkActive,HttpClientModule,MatButtonModule,MatDividerModule,MatIconModule,MatSelectModule,MatFormFieldModule,FormsModule],
  templateUrl: './adminprofile.component.html',
  styleUrl: './adminprofile.component.scss'
})

export class AdminprofileComponent implements OnInit {

  prdList:Iproduct[]=[]

  selectedPrdId:number=0
  selectedPrd: Iproduct | null = null;
  updateProductForm:FormGroup
  productForm:FormGroup
  constructor(private formBuilder:FormBuilder,private adminService:AdminService,private snackBar:MatSnackBar,private productsService:ProductsService)
  {

   

   
    this.productForm = this.formBuilder.group({
   
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      imageUrl: ['', Validators.required],
      categoryId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });



    this.updateProductForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      imageUrl: ['', Validators.required],
    });


  



  }

  ngOnInit(): void {

    this.productsService.getAllProducts().subscribe({
      next: (products) => this.prdList = products,
      error: (err) => console.error('Failed to load products', err)
    });


  }


  onProductChange(prd: Iproduct | null): void {



    if (prd) {
      this.updateProductForm.patchValue({
        id: prd.id,
        name: prd.name,
        price: prd.price,
        quantity: prd.quantity,
        imageUrl: prd.imageUrl,
  
      });
    } 
  }

  

  
  

  get updatePrice()
  {
   return this.updateProductForm.get('price')

  }


  
  get UpdateQuantity()
  {
   return this.updateProductForm.get('quantity')

  }


  



  

  get price()
  {
   return this.  productForm.get('price')

  }


  
  get quantity()
  {
   return this.productForm.get('quantity')

  }


  get categoryId()
  {

    return this.productForm.get('categoryId')

  }


 

  add(): void {
    if (this.  productForm.valid) {
      const productData: Iproduct = this.productForm.value;
      this.adminService.addProduct(productData).subscribe({
        next: () =>{
          this.openSnackBar('New Product added successfully', 'Close'),
          window.location.reload()
        } ,
        error: (error: Error) => this.openSnackBar(error.message, 'Close')
      });
    }
  }

  delete(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteProduct(this.selectedPrdId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            window.location.reload();
          },
          error: (error: Error) => Swal.fire('Error!', error.message, 'error')
        });
      }
    });
  }

  update(): void {
    const productId: number = this.updateProductForm.get('id')?.value;
    console.log(productId)
    const newData: Iproduct = this.updateProductForm.value;
    console.log(newData)
    this.adminService.UpdateProduct(productId, newData).subscribe({
      next: () => this.openSnackBar('Product updated successfully', 'Close'),
      error: (error: Error) => this.openSnackBar(error.message, 'Close')
    });
  }



   resetUpdateForm()
   {
    
    this.updateProductForm.reset()
    this.selectedPrd=null

   }



   
   resetProductForm()
   {
    
    this.productForm.reset()
    this.selectedPrdId=0

   }




  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }
}