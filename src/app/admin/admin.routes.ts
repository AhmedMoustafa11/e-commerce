import { Routes } from "@angular/router";
import { AdminprofileComponent } from "./components/adminprofile/adminprofile.component";
import { adminGuard } from "./guard/admin.guard";

export const routes:Routes=[
    { path: '', redirectTo: 'adminprofile', pathMatch: 'full' },
    {path:'adminprofile',component:AdminprofileComponent,canActivate:[adminGuard]},


]