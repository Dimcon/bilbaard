import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UtilityService} from "../../services/utility.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private utilService: UtilityService,
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
    } catch (err) {
      this.error = err
    }
  }


}
