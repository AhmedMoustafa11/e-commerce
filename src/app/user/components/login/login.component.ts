import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator, } from '../../custom validator/registrationValidator';
import { UserService } from '../../service/user.service';
import { Iuser } from '../../../model/iuser';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../../../admin/service/admin.service';
import { Iadmin } from '../../../model/iadmin';
import { SharedService } from '../../../shared/service/shared.service';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';






@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink,RouterLinkActive,HttpClientModule,MatDividerModule,MatIconModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent   implements OnInit {



   loginForm:FormGroup

    usersData:Iuser[]=[]

    
   adminsData:Iadmin[]=[]

  constructor(private formBuilder:FormBuilder,private userService:UserService,private adminService:AdminService,private sharedService:SharedService)
  {

    
  this.loginForm=formBuilder.group({

    email:['',[Validators.required, emailValidator()]],

    password:['',Validators.required]


  }

);



    this.userService.getUsersData().subscribe(users=>{


     this.usersData=users



    })

    
    this.adminService.getAdminsData().subscribe(admins=>{


      this.adminsData=admins
 
    
 
     })






    
    


  }



  ngOnInit(): void {


    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
     const userEmail=user.email
     const userPass=user.password
  
   this.loginForm.setValue({

     email:userEmail || '',

    password:userPass || ''

   })


  }





  get email()
  {

    return  this.loginForm.get('email')

  }




  get password()
  {

    return  this.loginForm.get('password')

  }





  
 login()
 {



   this.sharedService.login(this.usersData,this.adminsData,this.loginForm)


 }





}
