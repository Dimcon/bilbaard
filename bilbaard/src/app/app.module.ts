import { NgModule,  } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms";
import {HttpService} from "./services/http-service.service";
import {HttpClient, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import { BoardComponent } from './home/board/board.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BoardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'angular-universal-demo'}),
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN'
    }),
    ],
  exports: [CommonModule, BrowserModule],
  providers: [HttpService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
