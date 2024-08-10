import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';





export const routes: Routes = [
  
    
  {path:'', redirectTo:'products',pathMatch:'full'},

 
    
 

  
   


    
    {
      path: 'cart', 
      loadChildren: () => import('./cart/cart.routes').then(m => m.routes)
    },


    
    {
      path: 'products', 
      loadChildren: () => import('./products/products.routes').then(m => m.routes)
    },



    {
      path: 'user', 
      loadChildren: () => import('./user/user.routes').then(m => m.routes)
    },



    
    
    {
      path: 'admin', 
      loadChildren: () => import('./admin/admin.routes').then(m => m.routes)
    },


    {path:'**',component:NotFoundComponent},

   



  
  ];
  



