import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iproduct } from '../../model/iproduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Iuser } from '../../model/iuser';
import { Iadmin } from '../../model/iadmin';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  httpOption

  
  



  private isBrowser: boolean 
  static isUserLogged: any;



  constructor(private httpClient:HttpClient,@Inject(PLATFORM_ID) private platformId: Object)
{

  this.httpOption={
   headers:new HttpHeaders({
 
    'Content-Type': 'application/json',

   })
  

  }


  


  this.isBrowser = isPlatformBrowser(this.platformId);

 }



 addProduct(product:Iproduct):Observable<Iproduct>
 {

     
  return this.httpClient.post<Iproduct>(`${environment.APIURL}/products`,JSON.stringify(product),this.httpOption)

 }





 deleteProduct(pid: number): Observable<void> {
  return this.httpClient.delete<void>(`${environment.APIURL}/products/${pid}`);
}







 UpdateProduct(pid:number,newData:Iproduct):Observable<Iproduct>
 {

     
  return this.httpClient.patch<Iproduct>(`${environment.APIURL}/products/${pid}`,newData, this.httpOption);

 }





 

getAdminsData():Observable<Iadmin[]>
 {

     
  return this.httpClient.get<Iadmin[]>(`${environment.APIURL}/admins`)

 }






}
