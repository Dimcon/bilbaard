import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {UtilityService} from "./services/utility.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bilbaard';

  isLoggedIn = false


  constructor(
    public authService: AuthService,
    public utilService: UtilityService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    router.events.subscribe((url:any) => {
      console.log(url)
      const authUrls = ['/login', '/register']
      this.isLoggedIn = this.authService.isLoggedIn()
      if ((!authUrls.includes(url.url)) && !this.isLoggedIn) {
        // this.router.navigate(['/', 'login']).then(r => {
        //
        // })
      }
    });
  }

  ngOnInit(): void {
  }

  async logout() {
    await this.authService.logout()
    await this.router.navigateByUrl('/login')
  }


}
