import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Iuser } from '../../../model/iuser';
import { UserService } from '../../service/user.service';
import { complexPassword, emailValidator, existEmailValidator, passwordMatch, } from '../../custom validator/registrationValidator';
import { HttpClientModule } from '@angular/common/http';


import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule,MatIconModule,MatDividerModule,MatButtonModule,],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent    {


registrationForm:FormGroup

existUsersEmail:Iuser[]=[]


constructor(private formBuilder:FormBuilder,private userService:UserService,private snackBar: MatSnackBar  )
{



   this.userService.getUsersData().subscribe(usersData=>{

     this.existUsersEmail=usersData
    
      


   })



   this.registrationForm=formBuilder.group({
    fullName:['',[Validators.required,Validators.pattern('[A-Za-z]{3,}')]],
    phoneNo: formBuilder.array([formBuilder.control('', [Validators.required,Validators.pattern('^[0-9]*$')])]),
    address:['',[Validators.required,Validators.pattern('[A-Za-z]{3,}')]],
    email:['',[Validators.required,emailValidator(),existEmailValidator(this.existUsersEmail)]],
    password:['',[Validators.required,]],
    confirmPassword:['',[Validators.required]],
  
  }, {
    validators: [passwordMatch, complexPassword]
  });



 }








 





 get fullName()
 {
   return this.registrationForm.get('fullName')
   

 }





 get phoneNo()
 {
   return this.registrationForm.get('phoneNo') as FormArray
   

 }


 

 get address()
 {
   return this.registrationForm.get('address')
   

 }






 get email()
 {
   return this.registrationForm.get('email') 
   

 }


 

 get password()
 {


 
   return this.registrationForm.get('password') 


   

 }


 

 get confirmPassword()
 {
   return this.registrationForm.get('confirmPassword') 
   

 }

 



 addPhoneNo(event:any)
 {
 


    this.phoneNo.push(new FormControl('',[Validators.required,Validators.pattern('^[0-9]*$')]))


  event.target?.classList.add('d-none')


}



 
 
 
 
 
 
 
 
 
 
 


 submit()
 {


  
  if (this.registrationForm.valid) {

    let userData:Iuser=<Iuser>this.registrationForm.value


    const observer={

      next:(newUser:any)=>{
      
        this.openSnackBar('New User added successfully', 'Close');

      },
      
     error:(error:Error)=>{
      this.openSnackBar(error.message, 'Close');
     }
    
 

     }

    this.userService.sendUserData(userData).subscribe(observer)



 }

}




openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 3000, 

    horizontalPosition: 'left',
    verticalPosition: 'bottom',
  });
}


}







