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


  async register(isAdmin = false) {
    this.error = null
    this.passerror = null
    try {
      /*
      Regex found here:
      https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
      Usernames can only have:
      - Lowercase Letters (a-z)
      - Numbers (0-9)
      - Dots (.)
      - Underscores (_)
  */
      let res = /^[a-zA-Z0-9_\.]{6,}$/.exec(this.username);
      let valid = !!res;
      if (!valid) {
        this.error = "Regex mismatch. The username does not meet the criteria."
        return
      }

      res = /^[0-9]{13,}$/.exec(this.idnum);
      valid = !!res;
      if (!valid) {
        this.error = "Regex mismatch. The ID number is invalid."
        return
      }


      res = /^.{6,}$/.exec(this.password);
      valid = !!res;
      if (!valid) {
        this.error = "Regex mismatch. The password is too short."
        return
      }

      if (this.password !== this.dupePass) {
        this.passerror = "Passwords do not match."
        return
      }
      if (isAdmin) {
        await this.authService.registerAsAdmin(
          this.username,
          this.idnum,
          this.password
        )
      } else {
        await this.authService.register(
          this.username,
          this.idnum,
          this.password
        )
      }
      this.router.navigate(['/', 'board'])
    } catch (err) {
      this.error = err
    }
  }


}
