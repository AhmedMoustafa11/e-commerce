import { Routes } from "@angular/router";
import { CartComponent } from "./components/cart/cart.component";
import { userGuard } from "../user/guard/user.guard";

export const routes:Routes=[
 { path: '', redirectTo: 'cart', pathMatch: 'full' },
{path:'cart',component:CartComponent,canActivate:[userGuard]}
  

]