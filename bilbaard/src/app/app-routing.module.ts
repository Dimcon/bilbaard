import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./home/login/login.component";
import {RegisterComponent} from "./home/register/register.component";
import {BoardComponent} from "./home/board/board.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'board',
    component: BoardComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
