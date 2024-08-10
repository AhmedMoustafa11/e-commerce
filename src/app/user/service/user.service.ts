import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Injectable} from '@angular/core';
import {  catchError, Observable, retry, throwError } from 'rxjs';
import { Iuser } from '../../model/iuser';
import { environment } from '../../../environments/environment';




@Injectable({
  providedIn: 'root'
})


export class UserService {

  

  httpOption;
  

  constructor(private httpClient:HttpClient)
  { 

  this.httpOption = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json',

    })

   }


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




 
  sendUserData(newUser:Iuser):Observable<Iuser[]>
  {


     return this.httpClient.post<Iuser[]>(`${environment.APIURL}/users`,JSON.stringify(newUser), this.httpOption)


     .pipe(

      retry(2),

      catchError(this.handleError)

     )






  }



  updateUserData(id: string, user: Iuser): Observable<Iuser> {
    return this.httpClient.patch<Iuser>(`${environment.APIURL}/users/${id}`, user, this.httpOption)
    .pipe(

      retry(2),

      catchError(this.handleError)

      );
  }
 
  getUsersData():Observable<Iuser[]>
  {


     return this.httpClient.get<Iuser[]>(`${environment.APIURL}/users`)


     .pipe(

      retry(2),

      catchError(this.handleError)

     )

  }






 
      
 
   }
 
 
  




  









