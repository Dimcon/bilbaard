import { Injectable } from '@angular/core';
import {HttpService} from "./http-service.service";

import {environment} from "../../environments/environment";
import {UtilityService} from "./utility.service";
import * as moment from 'moment';

const baseUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private utilityService: UtilityService
  ) { }

  async login(userid: string, pass: string) {
    const result = await this.httpService.post(`${baseUrl}/auth/authenticate`,{
      username: userid,
      password: pass
    })
    if (result.success) {
      this.httpService.setAuthToken(result.token)
      this.utilityService.user = result.user;
      const expiresAt = moment().add(result.expiresIn,'second');
      localStorage.setItem('jwt_token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    } else {
      throw "Credentials are bad."
    }
  }

  getAuthToken() {
    return localStorage.getItem("jwt_token");
  }

  logout() {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    localStorage.removeItem("expires_at");
  }

  async register(username: string, userid: string, pass: string) {
    const result = await this.httpService.post(`${baseUrl}/auth/register`,{
      name: username,
      email: userid,
      username: userid,
      password: pass
    })
    if (result.success) {
      await this.login(userid, pass)
    } else {
      throw "Credentials are bad."
    }
  }

  public isLoggedIn() {
    const userjs = localStorage.getItem('user')
    this.httpService.setAuthToken(this.getAuthToken() || '')
    this.utilityService.user = JSON.parse(userjs || '{}')
    return moment().isBefore(this.getExpiration());
  }

//https://blog.angular-university.io/angular-jwt-authentication/
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration || '0');
    return moment(expiresAt);
  }

}
