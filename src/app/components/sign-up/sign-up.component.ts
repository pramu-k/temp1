import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";

export function passwordsMatchValidator():ValidatorFn{
  return (control:AbstractControl):ValidationErrors | null=>{
    const password=control.get('password')?.value;
    const confirmPassword=control.get('confirmPassword')?.value;
    if(password && confirmPassword && password!==confirmPassword){
      return {
        passwordsDontMatch:true
      };
    }else{
      return null;
    }

  };
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(private fb:FormBuilder,
              private authService:AuthenticationService,
              private router:Router,
              private toast:HotToastService) {
  }

  signUpForm=this.fb.group({
    name:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required],
    confirmPassword:['',Validators.required],
  },{validators:passwordsMatchValidator()});

  get name(){
    return this.signUpForm.get('name');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }
  submit(){
    const {name,email,password}=this.signUpForm.value;
    if(!this.signUpForm.valid ||!name ||!email || !password){
      console.log("invalid");
      return;
    }
    this.authService.signUp(name,email,password).pipe(
      this.toast.observe({
        success:"Congratulations! You Have Signed Up!",
        loading:"Signing in...",
        error:({message})=>`${message}`
      })
    ).subscribe(()=>{
      this.router.navigate(['/home']);
    })

  }

}
