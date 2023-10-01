import { Component } from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService:AuthenticationService,
    private router:Router,
    private toast:HotToastService,
    //private fb:NonNullableFormBuilder
  ) {
  }
/*  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  });*/
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
  })

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  submit(){
    const { email, password } = this.loginForm.value;
    if(!this.loginForm.valid ||!email || !password){
      console.log("invalid");
      return;
    }

    this.authService.login(email,password).pipe(
      this.toast.observe({
        success:'Logged in Successfully!',
        loading:'Logging in...',
        error:({message})=> `There was an error:${message}`,
      })
    ).subscribe(()=>{
      this.router.navigate(['/home']);
    });
  }

}
