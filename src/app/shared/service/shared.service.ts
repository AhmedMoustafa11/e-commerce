import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Iuser } from '../../model/iuser';
import { Iadmin } from '../../model/iadmin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private isUserLoggedSubject = new BehaviorSubject<boolean>(this.isUserLogged);
  private isAdminLoggedSubject = new BehaviorSubject<boolean>(this.isAdminLogged);
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {

    }
  }

  login(usersData: Iuser[], adminsData: Iadmin[], loginForm: FormGroup) {
    if (loginForm.invalid) {
      return this.openSnackBar('Please fill in all required fields.', 'close');
    }

    const emailValue: string = loginForm.value.email;
    const passValue: string = loginForm.value.password;

    const loginData = {
      email: emailValue,
      password: passValue
    };

    const foundUserData = usersData.find(user => user.email === emailValue && user.password === passValue);
    const foundAdminData = adminsData.find(admin => admin.email === emailValue && admin.password === passValue);

    if (foundUserData) {
      localStorage.setItem('user', JSON.stringify(loginData));
      this.isUserLoggedSubject.next(true);
      this.router.navigateByUrl('/products/products');
    } else if (foundAdminData) {
      localStorage.setItem('admin', JSON.stringify(loginData));
      this.isAdminLoggedSubject.next(true);
      this.router.navigateByUrl('/admin/adminprofile');
    } else {
      this.openSnackBar('The email address or password you entered was incorrect.', 'close');
    }
  }

  get isUserLogged(): boolean {
    return this.isBrowser ? !!localStorage.getItem('user') : false;
  }

  get isAdminLogged(): boolean {
    return this.isBrowser ? !!localStorage.getItem('admin') : false;
  }

  logout() {
  if (this.isUserLogged) {
      localStorage.removeItem('user');
      this.isUserLoggedSubject.next(false);
    }

    if (this.isAdminLogged) {
      localStorage.removeItem('admin');
      this.isAdminLoggedSubject.next(false);
    }


    this.router.navigateByUrl('/user/login');
  }

  getUserLoggedStatus(): Observable<boolean> {
    return this.isUserLoggedSubject.asObservable();
  }

  getAdminLoggedStatus(): Observable<boolean> {
    return this.isAdminLoggedSubject.asObservable();
  }

  getCurrentUser(): Iuser | null {
    if (this.isBrowser) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getCurrentAdmin(): Iadmin | null {
    if (this.isBrowser) {
      const admin = localStorage.getItem('admin');
      return admin ? JSON.parse(admin) : null;
    }
    return null;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });
  }
}
