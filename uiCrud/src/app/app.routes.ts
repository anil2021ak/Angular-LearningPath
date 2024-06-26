import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiDashboardComponent } from './api-dashboard/api-dashboard.component';
import { SkillCardsComponent } from './skill-cards/skill-cards.component';

import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './ngStore/home/home.component';
import { AboutComponent } from './ngStore/about/about.component';
import { AuthGuard } from './login-user.guard';
import { WeatherAppComponent } from './weather-app/weather-app.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ManageDataComponent } from './Jabberjet/manage-data/manage-data.component';
import { PocComponent } from './poc/poc.component';
import { ChildPOCComponent } from './child-poc/child-poc.component';
import { WeatherMainComponent } from './Component Interaction/weather-main/weather-main.component';





export const routes: Routes = [
    {path:'',redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent},

    {path:'skills', component:NavbarComponent,
    children:[
         {path:"",redirectTo:'dashboard',pathMatch:'full'},
        {path:"dashboard", component:DashboardComponent},
        {path:'employee',component:ApiDashboardComponent},
        {path:"skillCard", component:SkillCardsComponent},
        {path:'home',component:HomeComponent},
        {path:'about',component:AboutComponent},
        {path:'weather',component:WeatherAppComponent},
        {path:'chat',component:ChatboxComponent},
        {path:'manageData',component:ManageDataComponent},
        {path:'poc', component:PocComponent},
        {path:'childPoc', component:ChildPOCComponent},
        {path:'mainWeather', component:WeatherMainComponent}


    ],canActivate:[AuthGuard]
},   
];
