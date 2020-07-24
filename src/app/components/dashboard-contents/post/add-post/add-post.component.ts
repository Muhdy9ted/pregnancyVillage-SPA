import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { Post } from 'src/app/_shared/models/post.model';
import { FileUploader } from 'ng2-file-upload';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/_shared/models/category.model';
import { AuthService } from 'src/app/_shared/services/auth.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  spin = false;
  createdPost: any;
  category: any;
  categories: Category[];
  categoriesValue = [];
  uploader: FileUploader;
  selectedFile = null;
  selectedCategory = null;
  userId = this.authService.userID;


  constructor(public forumService: ForumService, private router: Router, private alertify: AlertifyService,
              private authService: AuthService) { }

  ngOnInit() {
    // this.createCategory();
    this.loadCategories();
    // console.log(this.categories);
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      // url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

  }

  onFileSelected(event) {
    this.selectedFile = event.originalTarget.files[0];
    this.forumService.createPostDto.upload_file = this.selectedFile.name;

    // console.log(this.selectedFile);
  }

  onCategorySelected(event) {
    this.forumService.createPostDto.category = event.target.value;
  }

  loadCategories() {
    this.forumService.getCategories().subscribe((response: any) => {
      // let items = Object.va
      // temp.forEach(element => {
      //   this.categories.push(element);
      // });
      this.categories = response.data;
      // console.log(this.categories);
      // this.categories.forEach(item => console.log(Object.entries(item)));
      // const rest = response.data;
      // console.log(rest);
      // rest.forEach(item => {
      //   const rest2 = Object.keys(item);
      //   // console.log(rest2);
      //   rest2.map(key => {
      //     let value = item[key];
      //     this.categoriesValue.push(value);
      //   });
      // });
      // console.log(this.categoriesValue);
      // const items = Object.entries(response.data[0]);
      // console.log(items);
      // console.log(items[1][1]);

      // this.categories = items.map(item => {
      //   const item2 = Object.entries(item[1]);
      //   console.log(item2);
      //   // return ({'item2[1]': item2[2]});
      // });
      // console.log(this.categories);

      // this.categories = response;
      // console.log(this.categories);
    }, error => {
      this.alertify.error('error retreiving categories, please retry!');
      // console.log(error);
    });
  }

  createCategory() {
    this.forumService.createCategory().subscribe((response: any) => {
      this.category = response;
      // console.log(response);
    }, error => {
      // console.log(error);
    });
  }

  onSubmit() {
    this.spin = true;
    this.forumService.createPost().subscribe((response: any) => {
      this.createdPost = response;
      this.forumService.createPostDto = new Post();
      // console.log(this.createdPost);
    }, error => {
      this.spin = false;
      this.alertify.error('your post wasn\'t created, please retry!');
    }, () => {
      this.alertify.success('Post created successfully');
      this.router.navigate(['/' + this.userId + '/posts/my-posts']);
    });
  }

  handleFileInput(files: FileList) {
    // this.forumService.createCommentDto.comment_upload_file = files.item(0);
    this.forumService.createPostDto.upload_file = files.item(0);
    console.log(this.forumService.createPostDto);
  }

}
