import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Category } from '../models/category';
import { GetPost } from '../models/getPost';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  baseURL = environment.apiUrl;
  createPostDto = new Post();

  constructor(public http: HttpClient, private authService: AuthService) { }

  createPost() {
    // tslint:disable-next-line: variable-name
    // const {topic, category, description, upload_file} = this.createPostDto;
    // console.log(file_upload);
    return this.http.post<any>(this.baseURL + 'topic/', this.createPostDto);
  }

  getPosts(): Observable<GetPost> {
    return this.http.get<GetPost>(this.baseURL  + 'topic/');
  }

  getUserPosts(): Observable<GetPost[]> {
    return this.http.get<GetPost[]>(this.baseURL + `user/topic/all`);
  }

  getPost(id) {
    return this.http.get(this.baseURL + `topic/${id}`);
  }

  createComment(comment: any) {
    return this.http.post(this.baseURL + 'comment', comment); // reactions
  }

  createCategory() {
    return this.http.post(this.baseURL + 'category/', {name: 'Food', description: 'Everything relating to meals during pregnancy period'});
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseURL + 'category/');
  }
}
