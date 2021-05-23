import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from "./auth.service";


@Injectable()
export class HttpService {
  constructor(
    private httpClient: HttpClient,
  ) {}

  private authToken: string = '';

  public setAuthToken(token: string) {
    this.authToken = token
  }

  public post(url: string, body: any, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, body, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public put(url: string, body: any, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, body, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public patch(url: string, body: any, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(url, body, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public get(url: string, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public delete(url: string, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(url, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public getText(url: string, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers: any = this.getHeaders(apiKey);
      headers.responseType = 'text';

      this.httpClient.get(url, headers).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public getHeaders(apiKey?: string): { headers: any } {
    let headers = new HttpHeaders();

    if (this.authToken) {
      headers = headers.append('Authorization', 'Bearer ' + this.authToken);
    }

    return { headers };
  }
}
