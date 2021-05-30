import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UtilityService} from "../../services/utility.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private utilService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.utilService.user = null
  }

  username =  ''
  idnum =  ''
  password = ''
  dupePass = ''

  error: string | null = null;
  passerror: string | null = null;


  async register() {
    this.error = null
    this.passerror = null
    try {
      if (this.password !== this.dupePass) {
        this.passerror = "Passwords do not match."
        return
      }
      await this.authService.register(
        this.username,
        this.idnum,
        this.password
      )
      this.router.navigate(['/', 'board'])
    } catch (err) {
      this.error = err
    }
  }


}
