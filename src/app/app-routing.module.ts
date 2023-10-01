import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./components/landing/landing.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import {ProfileComponent} from "./components/profile/profile.component";

const redirectToLogin=()=>redirectUnauthorizedTo(['login']);
const redirectToHome=()=>redirectLoggedInTo(['home'])
const routes: Routes = [
  {path:'',component:LandingComponent,pathMatch:"full"},
  {path:'login',component:LoginComponent,...canActivate(redirectToHome)},
  {path:'home',component:HomeComponent,...canActivate(redirectToLogin)},
  {path:'sign-up',component:SignUpComponent,...canActivate(redirectToHome)},
  {path:'profile',component:ProfileComponent,...canActivate(redirectToLogin)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
