import { Injectable } from '@angular/core';
import {HttpService} from "./http-service.service";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";

const baseUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  public user: any = null;

  constructor(
    private httpService: HttpService,
  ) { }

  async createPost(text: string) {
    await this.httpService.post(baseUrl + '/posts/newPost',
      {
        userId: this.user.id,
        text: text
      })
  }


  async deletePost(postId: string) {
    await this.httpService.post(baseUrl + '/posts/deletePost',
      {
        userId: this.user.id,
        postId: postId
      })
  }

  async getPosts() {
    const result = await this.httpService.get(baseUrl + '/posts/posts')
    return result
  }
}
