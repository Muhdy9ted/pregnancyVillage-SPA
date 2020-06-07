import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  baseURL = environment.apiUrl;
  createPostDto = new Post();

  constructor(public http: HttpClient) { }

  createPost() {
    // tslint:disable-next-line: variable-name
    // const {topic, category, description, upload_file} = this.createPostDto;
    // console.log(file_upload);
    return this.http.post<any>(this.baseURL + 'topic/', this.createPostDto);
  }

  getPosts() {
    return this.http.get<[]>(this.baseURL);
  }


  createCategory() {
    return this.http.post(this.baseURL + 'category/', {name: 'Food', description: 'Everything relating to meals during pregnancy period'});
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseURL + 'category/');
  }
}
