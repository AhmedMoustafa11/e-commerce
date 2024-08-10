import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Iuser } from '../../../model/iuser';

import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { complexPassword, emailValidator, existEmailValidator, passwordMatch } from '../../custom validator/registrationValidator';



@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatIconModule,MatDividerModule,MatButtonModule],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {


  profileForm: FormGroup;
  usersData: Iuser[]=[]
  user={}
  isUserLogged: boolean = false;

  existUsersEmail:Iuser[]=[]

  constructor(private formBuilder: FormBuilder, private userService: UserService,private snackBar:MatSnackBar ) 
  
  {


   this.userService.getUsersData().subscribe(usersData=>{

    this.existUsersEmail=usersData
   
   })



    this.profileForm = this.formBuilder.group({
   
    id:[''],
    fullName:['',[Validators.required,Validators.pattern('[A-Za-z]{3,}')]],
    phoneNo: formBuilder.array([formBuilder.control('', [Validators.required,Validators.pattern('^[0-9]*$')])]),
 
    address:['',[Validators.required,Validators.pattern('[A-Za-z]{3,}')]],
    email:['',[Validators.required,emailValidator(),]],
    password:['',[Validators.required,]],
    confirmPassword:['',[Validators.required]],

  }, {
    validators: [passwordMatch,complexPassword]
  });



}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    
    if (user) {
      const userData = JSON.parse(user);

      if (userData && userData.email) {
        this.userService.getUsersData().subscribe(users => {
          this.usersData = users;
          

          const loggedUser = this.usersData.find(user => user.email === userData.email);

          console.log(loggedUser)
          if (loggedUser) {
            this.profileForm.patchValue({
               id:loggedUser.id,
              fullName: loggedUser.fullName,
              address: loggedUser.address,
              email: loggedUser.email,
              password: loggedUser.password,
              confirmPassword: loggedUser.confirmPassword
            });
  

            const phoneNoArray = this.profileForm.get('phoneNo') as FormArray;
            phoneNoArray.clear(); 
  
         
            if (loggedUser.phoneNo && Array.isArray(loggedUser.phoneNo)) {
              loggedUser.phoneNo.forEach(phone => {
                phoneNoArray.push(this.formBuilder.control(phone,[Validators.required,Validators.pattern('^[0-9]*$')]));
              });
            }
  
          } else {
            alert('User not found');
          }
        }, error => {
          console.error('Error fetching users data', error);
          alert('An error occurred while fetching user data.');
        });
      } else {
        alert('Invalid user data');
      }
    } else {
      alert('No user found in local storage');
    }
  }

  get fullName() {
    return this.profileForm.get('fullName');
  }

  get phoneNo(): FormArray {
    return this.profileForm.get('phoneNo') as FormArray;
  }

  get address() {
    return this.profileForm.get('address');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get password() {
    return this.profileForm.get('password');
  }
  

  get  confirmPassword() {
    return this.profileForm.get('confirmPassword');
  }
  



  edit() {

    if (this.profileForm.valid) {

      let id=this.profileForm.get('id')?.value

      let userData: Iuser = this.profileForm.value;

    
      const observer = {
        next:(user:any)=>{
      
          this.openSnackBar('Data Updated successfully', 'Close');
  
        },
        
       error:(error:Error)=>{
        this.openSnackBar(error.message, 'Close');
       }
      
      };

      this.userService.updateUserData(id,userData).subscribe(observer);
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
