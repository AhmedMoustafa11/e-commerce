import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Iproduct } from '../../../model/iproduct';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../service/products.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Icategory } from '../../../model/icategory';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { CartService } from '../../../cart/service/cart.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field'
import { UsdtoegpPipe } from '../../../pipe/usdtoegp.pipe';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../../../shared/service/shared.service';
import { AdminService } from '../../../admin/service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    RouterLinkActive,
    UsdtoegpPipe,
    ReactiveFormsModule,
    FormsModule,
    SpinnerComponent,
    HttpClientModule,
     MatFormFieldModule,
      MatSelectModule,
      MatIconModule,
      MatDividerModule,
      MatButtonModule,
    
    ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent  implements OnInit {




  catList:Icategory[]=[]

  selectCatId:number=0

  prdListOfCat:Iproduct[]=[]
  
  prdList:Iproduct[]=[]

  loading:boolean=false
  isUserLogged:boolean=false
  isAdminLogged:boolean=false
  searchFieldText:boolean=false
 
  updateProductForm:FormGroup
  productForm:FormGroup


  constructor(private productsService:ProductsService,
     private router:Router,
     private cartService:CartService ,
     private snackBar:MatSnackBar,
     private sharedService:SharedService,
     private Router:Router,
     private formBuilder:FormBuilder,
     private adminService:AdminService
    

    )

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
    
 

    this.loading = true;
    

    this.productsService.getAllProducts().subscribe(
      products => {
        this.prdListOfCat = products;
        this.loading = false;
      
  
      },
      error => {
        const errorMessage = error.message ? error.message : 'An unknown error occurred';
        this.openSnackBar(`Error fetching products: ${errorMessage}`,'close');
        this.loading = false;


      }


    );

this.productsService.getCategories().subscribe((categories)=>
{

  this.catList=categories

})



this.sharedService.getUserLoggedStatus().subscribe(status => {
  this.isUserLogged = status || !!this.sharedService.getCurrentUser();
});


this.sharedService.getAdminLoggedStatus().subscribe(status => {
  this.isAdminLogged = status || !!this.sharedService.getCurrentAdmin();
});





  }





  getProductsByCat(event:any)

  {



     if( this.selectCatId==0)


      {

        this.loading = true;
    
    
        this.productsService.getAllProducts().subscribe(products => {
    
          this.prdListOfCat = products;
    
          this.loading = false;

        })


      }

      else{

         
 

      this.productsService.getProductsByCatId(this.selectCatId).subscribe(products => {
      this.prdListOfCat = products;



    })


      }
 

      

  }

  search(searchText: string): void {

    this.searchFieldText=true

    if (this.prdList.length === 0) {
 
      this.productsService.getAllProducts().subscribe(products => {
        this.prdList = products;
        this.filterProducts(searchText);
      });
    } else {
      this.filterProducts(searchText);
    }
  }

  private filterProducts(searchText: string): void {
    if (searchText) {
      this.prdListOfCat = this.prdList.filter(prd =>
        prd.name.toLowerCase().includes(searchText.toLowerCase())
      
         
      );

    }
    
    


    } 
  





  prdTrackBnFn(index: number, prd: Iproduct): number {
    return prd.id;
  }




  buy(product: Iproduct,itemCount: number): void {


    if(this.isUserLogged)
    {


      const quantity = Number(itemCount);
      if (quantity>0) {
        this.cartService.addToCart(product, quantity);
  
  
  
      }else{

         this.openSnackBar('You must select quantity','close')

      }

    }else{


      this.openSnackBar(`You must login first`, 'Close');

      this.router.navigate(['/user/login'])

    }

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





  delete(pId: number): void {
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
        this.adminService.deleteProduct(pId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            window.location.reload();
          },
          error: (error: Error) => Swal.fire('Error!', error.message, 'error')
        });
      }
    });
  

  
   
  }






  getProduct(prd: Iproduct | null): void {


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


  update(): void {
    const productId: number = this.updateProductForm.get('id')?.value;
    const newData: Iproduct = this.updateProductForm.value;
  
    this.adminService.UpdateProduct(productId, newData).subscribe({
      next: () => {
        this.openSnackBar('Product updated successfully', 'Close');
        window.location.reload(); 
      },
      error: (error: Error) => this.openSnackBar(error.message, 'Close')
    });
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










  resetUpdateForm()
  {
   
   this.updateProductForm.reset()
 

  }



   
  resetProductForm()
  {
   
   this.productForm.reset()


  }






  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, 
 

 
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }
  







}

