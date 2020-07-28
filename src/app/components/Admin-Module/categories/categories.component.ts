import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/_shared/models/category.model';
import { timeStamp } from 'console';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { CreateCategory } from 'src/app/_shared/models/create-category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  postsBycategory: Category[] = [];
  displayModal1: boolean;
  displayModal2: boolean;
  displayModal3: boolean;
  spin = false;
  category: Category;

  constructor(private route: ActivatedRoute, public forumService: ForumService, private router: Router,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => {
      // console.log(data);
      this.categories = data.categories.data;
      this.categories.forEach(element => {
        this.forumService.postsByCategory(element._id).subscribe((response: any) => {
          this.postsBycategory.push(response.data);
        });
      });
    });
    // console.log(this.postsBycategory);


      // forcing a page reload and hereby re-initializing the component
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      };

      // on the the re-initialized component, the route data is stale,so
    if (this.forumService.reloadPage) {
        this.forumService.getCategories().subscribe((response) => {
          // console.log(response);
          // tslint:disable-next-line: no-string-literal
          // console.log(response);
          // tslint:disable-next-line: no-string-literal
          this.categories = response['data'];
          }, error => {
          this.router.navigate(['/admin/categories']);
        }, () => {
          this.forumService.reloadPage = false;
        });
      }
  }

  showDisplayModal1() {
    this.displayModal1 = true;
  }

  showDisplayModal2(category: any) {
    // console.log(category);
    this.forumService.createCategoryDTO.name = category.name;
    this.forumService.createCategoryDTO.description = category.description;
    this.category = category;
    this.displayModal2 = true;
  }

  showDisplayModal3(category: any) {
    this.category = category;
    this.displayModal3 = true;
  }

  onSubmitCreateCat() {
    this.spin = true;
    this.forumService.createCategory().subscribe((response: any) => {
      // console.log(response);
      this.forumService.createCategoryDTO = new CreateCategory();
      // console.log(this.createdPost);
    }, error => {
      this.spin = false;
      // console.log(error);
      this.alertify.error('the category wasn\'t created, please retry!');
    }, () => {
      this.alertify.success('new Category created successfully');
      this.displayModal1 = false;
      this.forumService.reloadPage = true;
      // this.router.navigateByUrl('/admin/users-list');
      // this.router.navigate(['/admin/posts']);
      this.router.navigate(['/admin/categories']);
    });
  }

  onSubmitUpdateCat() {
    // console.log(this.category);
    this.spin = true;
    this.forumService.updateCategory(this.category._id).subscribe((response: any) => {
      // console.log(response);
      this.forumService.createCategoryDTO = new CreateCategory();
      // console.log(this.createdPost);
    }, error => {
      this.spin = false;
      // console.log(error);
      this.alertify.error('the category wasn\'t update, please retry!');
      this.forumService.reloadPage = true;
      this.router.navigate(['/admin/categories']);
    }, () => {
      this.alertify.success('Category updated successfully');
      this.displayModal2 = false;
      this.forumService.reloadPage = true;
      this.router.navigate(['/admin/categories']);
    });
  }
}
