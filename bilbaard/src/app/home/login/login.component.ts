import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UtilityService} from "../../services/utility.service";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private utilService: UtilityService,
    private router: Router
  ) { }

  username = ''
  password = ''
  error: any = null;

  async ngOnInit() {
    // if(this.authService.isLoggedIn()) {
    //   await this.router.navigate(['board'])
    // }
  }

  async login(): Promise<void> {
    this.error = null;
    try {

      await this.authService.login(this.username, this.password)
      await this.router.navigate(['board'])
    } catch (err) {
      this.error = err
    }

  }



}
