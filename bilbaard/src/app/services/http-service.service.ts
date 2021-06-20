import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment";


const baseUrl = environment.apiUrl

@Injectable()
export class HttpService {
  constructor(
    private httpClient: HttpClient,
  ) {}

  private authToken: string = '';
  private csrfToken = '';
  private csrfData = '';
  private didCSRFRequest = false;

  public setAuthToken(token: string) {
    this.authToken = token
  }

  public post(url: string, body: any, apiKey?: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.doCSRFGet()
      this.addCsrfDataToRequest(body)
      this.httpClient.post(url, body, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public put(url: string, body: any, apiKey?: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.doCSRFGet()
      this.addCsrfDataToRequest(body)
      this.httpClient.put(url, body, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public patch(url: string, body: any, apiKey?: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.doCSRFGet()
      this.addCsrfDataToRequest(body)
      this.httpClient.patch(url, body, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public get(url: string, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.didCSRFRequest = true
      this.httpClient.get(url, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public delete(url: string, apiKey?: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.doCSRFGet()
      this.httpClient.delete(url, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public getText(url: string, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.didCSRFRequest = true
      const headers: any = this.getHeaders(apiKey);
      headers.responseType = 'text';

      this.httpClient.get(url, headers).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public async doCSRFGet() {
    if (!this.didCSRFRequest) {
      try {
        const response = (await this.httpClient.get(`${baseUrl}/`).toPromise()) as any;
        this.csrfToken = response.cookie
        this.csrfData = response.csrfData
        console.log(response)
        this.didCSRFRequest = true
        console.log("Did the test")
      } catch (e) {
        console.log("")
      }
    }
  }

  public addCsrfDataToRequest(body:any) {
    body._csrf = this.csrfData
  }

  public getHeaders(apiKey?: string): { headers: any } {
    let headers = new HttpHeaders();

    if (this.authToken) {
      headers = headers.append('Authorization', 'Bearer ' + this.authToken);
    }

    if (this.csrfToken) {
      headers = headers.append('X-CSRF-TOKEN', this.csrfToken);
    }

    return { headers };
  }
}
