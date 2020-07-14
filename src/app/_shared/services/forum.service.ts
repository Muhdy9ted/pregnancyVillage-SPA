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
import { Comment } from '../models/comment.model';
import { UpdatePost } from '../models/update-post.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
    // 'Access-Control-Allow-Origin': 'http://localhost:4200/'

  })
};


@Injectable({
  providedIn: 'root'
})
export class ForumService {

  baseURL = environment.apiUrl; // 'https://pregnancy-village.herokuapp.com/v1/forum/'
  createPostDto = new Post();
  createCommentDto = new Comment();
  categoriesForLP: Category[] = [];
  categoryPosts: GetPost[] = [];
  updatePostDTO = new UpdatePost();




  constructor(public http: HttpClient, private authService: AuthService) { }

  createPost() {
    // tslint:disable-next-line: variable-name
    // const {topic, category, description, upload_file} = this.createPostDto;
    // console.log(file_upload);
    console.log(this.createPostDto);
    const formData = new FormData();
    formData.append('topic', this.createPostDto.topic);
    formData.append('category', this.createPostDto.category);
    formData.append('description', this.createPostDto.description);
    formData.append('upload_file', this.createPostDto.upload_file);
    console.log(typeof this.createPostDto.upload_file);
    console.log(typeof formData.get('upload_file'));


    console.log(formData);

    return this.http.post<any>(this.baseURL + 'topic/', formData);
  }

  updateReactions(id: any, reactions: any) {
    return this.http.patch<any>(this.baseURL + 'action/like/' + id, reactions, httpOptions );
  }

  updatePost(id: any) {
    console.log(this.updatePostDTO);
    this.updatePostDTO.category = this.updatePostDTO.categoryObj._id;
    const {topic, description, comment, category} = this.updatePostDTO;
    console.log({topic, description, comment});
    return this.http.put<any>(this.baseURL + 'topic/' + id, {topic, description, comment, category});
    // To update topic by id: Baseurl/forum/topic/:id. payload => topic, description, category, comment (PUT request)
  }


  deletePost(id: any) {
    // to delete topic by id : Basseurl/forum/topic/:id (DELETE)
    return this.http.delete(this.baseURL + 'topic/' + id);
  }

  getPosts(): Observable<GetPost> {
    return this.http.get<GetPost>(this.baseURL  + 'topic/');
  }

  getUserPosts(): Observable<GetPost[]> {
    return this.http.get<GetPost[]>(this.baseURL + `user/topic/all`);
  }

  getPost(id) {
    // console.log(id);
    return this.http.get(this.baseURL + `topic/${id}`);
  }

  createComment() {
    return this.http.post(this.baseURL + 'comment',  this.createCommentDto); // reactions
  }

  createCategory() {
    return this.http.post(this.baseURL + 'category/', {name: 'Food', description: 'Everything relating to meals during pregnancy period'});
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseURL + 'category/');
  }

  getPostsForLandingPage() {
    return  this.http.get(this.baseURL + 'category/').pipe(map((response: any) => {
      // console.log(response.data);
      const userResponse = response.data;
      // console.log(typeof userResponse);
      if (userResponse) {
        // tslint:disable-next-line: no-shadowed-variable
        this.categoriesForLP = userResponse;
        }
      return this.categoriesForLP;
    }));
  }

  postsByCategory(id) {
    return this.http.get(this.baseURL +  `category/${id}`);
  }

}
