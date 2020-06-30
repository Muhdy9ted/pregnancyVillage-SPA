import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { GetPost } from '../models/getPost';
import { AuthService } from './auth.service';
import { Category } from '../models/category.model';
import { map } from 'rxjs/operators';
import { element } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class ForumService {

  baseURL = environment.apiUrl; // 'https://pregnancy-village.herokuapp.com/v1/forum/'
  createPostDto = new Post();
  categoriesForLP: Category[] = [];
  categoryPosts: GetPost[] = [];



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

  getPostsForLandingPage() {
    return  this.http.get(this.baseURL + 'category/').pipe(map((response: any) => {
      console.log(response.data);
      const userResponse = response.data;
      console.log(typeof userResponse);
      if (userResponse) {
        // tslint:disable-next-line: no-shadowed-variable
        userResponse.forEach(element => {
          console.log(element);
          this.categoriesForLP.push(element);
        });
        return this.categoriesForLP;
        // localStorage.setItem('token', JSON.stringify(userResponse[0][1]));
        // this.userToken = JSON.stringify(userResponse[0][1]);
        // console.log(this.decodedToken);
        // return this.userToken;
      }
      // if (response.state === 1) {
      //   localStorage.setItem('token', JSON.stringify(response.data));
      //   this.userToken = JSON.stringify(response.data);
      //   return this.userToken;
      // } else {
      //   return response;
      // }
    }));
  }

  postsByCategory(id) {
    return this.http.get(this.baseURL +  `category/${id}`);
  }
}
