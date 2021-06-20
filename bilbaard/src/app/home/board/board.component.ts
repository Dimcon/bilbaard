import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {UtilityService} from "../../services/utility.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  posts: any[] = []
  error = null;
  postText = '';

  constructor(
    private utilityService: UtilityService,
    private authService: AuthService,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/', 'login']).then(r => {
      })
    }

    try {
      this.posts = await this.utilityService.getPosts() as any
      // @ts-ignore
      this.posts = this.posts.posts.reverse()
    } catch (err) {
      this.error = err.error
    }
  }

  async newPost(): Promise<void> {
    this.error = null
    try {
      await this.utilityService.createPost(this.postText)
      this.posts = await this.utilityService.getPosts() as any
      // @ts-ignore
      this.posts = this.posts.posts.reverse()
    } catch (err) {
      this.error = err.error
    }
  }


  async deletePost(postId: string) {
    this.error = null
    try {
      await this.utilityService.deletePost(postId)
      this.posts = await this.utilityService.getPosts() as any
      // @ts-ignore
      this.posts = this.posts.posts.reverse()
    } catch (err) {
      this.error = err.error
    }
  }

}
