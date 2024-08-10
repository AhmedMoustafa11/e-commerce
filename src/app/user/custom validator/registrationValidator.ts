import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Iuser } from "../../model/iuser";

 
  export function  existEmailValidator(existEmails:Iuser[]): ValidatorFn
  {
  
    return(control:AbstractControl):ValidationErrors | null=>{
  
  
      let emailValue:string=control.value;
  
  
   
   if(emailValue.length==0 &&control.untouched)
  
    {
  
      return null
  
    }
  
  
  
    else
    {
  
      
    let ValidationErrors={'ExistEmail':{'value':emailValue} }
 
    const foundEmail = existEmails.find(user => user.email === emailValue);
 
 
    return foundEmail?ValidationErrors:null
    }
  
  
    }
  
  }
  




  
 export function emailValidator(): ValidatorFn
 {
 
   return(control:AbstractControl):ValidationErrors | null=>{
 
 
     let emailValue:string=control.value;
 
 
  
 if(emailValue.length==0 &&control.untouched)
 
   {
 
     return null
 
   }
 
 
 
   else
   {
 
     
    let ValidationErrors={'EmailNotValid':{'value':emailValue} }
 
 
   return (emailValue.includes('@'))?null :ValidationErrors
 
   }
 
 
   }
 
 }



 

 export const passwordMatch :ValidatorFn=(formGroup:AbstractControl):ValidationErrors | null=>{


  let pass= formGroup.get('password')

  let confirmPassword= formGroup.get('confirmPassword')


  if(!pass || !confirmPassword|| !pass.value || !confirmPassword.value)
    {
        return null

    }
  

  
    else
    {
  


    let ValidationErrors={'UnMatchedPassword':{'pass':pass?.value,'confirmPassword':confirmPassword?.value}}


    return (pass?.value==confirmPassword?.value)?null : ValidationErrors

  
    }



 }




 
 export const complexPassword: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  const password = formGroup.get('password');
  const fullName = formGroup.get('fullName');

  if (!password || !fullName || !password.value || !fullName.value) {
      return null;  // Return null if either field is not present or empty
  }

  const passwordValue = password.value.toLowerCase();  // Convert to lowercase for case-insensitive comparison
  const fullNameValue = fullName.value.toLowerCase();  // Convert to lowercase for case-insensitive comparison

  const foundFullName = passwordValue.includes(fullNameValue);

  return foundFullName ? { 'PasswordContainFullName': { 'pass': passwordValue, 'fullName': fullNameValue } } : null;
};

