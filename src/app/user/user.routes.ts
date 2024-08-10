import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { userGuard } from './guard/user.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'userprofile', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'userprofile', component: UserprofileComponent,canActivate:[userGuard]}
];