import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Iproduct } from '../../model/iproduct';
import { environment } from '../../../environments/environment';
import { Icategory } from '../../model/icategory';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {





  constructor(private httpClient:HttpClient)
   { 

   }



   private handleError(error:HttpErrorResponse)
   {

       if(error.status===500)
       {

         console.error(  'An Error occurrd',error.error)

       }

       else{


             console.error( `backEnd returned code ${error.status}  body was :`, error.error )


       }

       return throwError(() => new Error('Error Occured; please try again later.'));

       


   }




   getAllProducts():Observable<Iproduct[]>
   {


     return this.httpClient.get<Iproduct[]>(`${environment.APIURL}/products`)

     .pipe(

        retry(2),

        catchError(this.handleError)


     )
     
      
     

   }




   getCategories():Observable<Icategory[]>
   {


     return this.httpClient.get<Icategory[]>(`${environment.APIURL}/categories`)

     .pipe(

        retry(2),

        catchError(this.handleError)


     )
     


    }



 
getProductsByCatId(catId: number)
{




  return this.httpClient.get<Iproduct[]>(`${environment.APIURL}/products?categoryID=${catId}`)

  .pipe(

     retry(2),

     catchError(this.handleError)


  )


 
}










getProductById(pId: number): Observable<Iproduct> {

  return this.httpClient.get<Iproduct>(`${environment.APIURL}/products/${pId}`)
  .pipe(

     retry(2),

     catchError(this.handleError)


  )


 
}

 
}














