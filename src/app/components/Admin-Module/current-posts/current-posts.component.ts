import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetPost } from 'src/app/_shared/models/getPost';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';

@Component({
  selector: 'app-current-posts',
  templateUrl: './current-posts.component.html',
  styleUrls: ['./current-posts.component.scss']
})
export class CurrentPostsComponent implements OnInit {

  posts: GetPost[];
  displayModal: boolean;
  post: GetPost;


  constructor( private route: ActivatedRoute, private forumService: ForumService, private alertify: AlertifyService,
               private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => {
      this.posts = data.posts.data;
      // console.log(this.posts);
    });

     // forcing a page reload and hereby re-initializing the component
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    // on the the re-initialized component, the route data is stale,so i did another fresh call to the service and updated the post-variable
    if (this.forumService.reloadPage) {
      this.forumService.getPosts().subscribe((response) => {
        // console.log(response);
        // tslint:disable-next-line: no-string-literal
        this.posts = response['data'];
      }, error => {
        this.router.navigate(['/admin/posts']);
      }, () => {
        this.forumService.reloadPage = false;
      });
    }
  }

  showInfo(post: GetPost) {
    this.post = post;
    this.displayModal = true;
  }

  approvePost(id: any) {
    // console.log(id);
    if ( confirm('This action will appove this post')) {
      this.forumService.approvePost(id).subscribe((response) => {
        // console.log(response);
        this.alertify.success('post has been approved successfully');
      }, error => {
        // console.log(error);
        this.alertify.error('error approving the post, please retry');
      }, () => {
        this.forumService.reloadPage = true;
        // this.router.navigateByUrl('/admin/users-list');
        this.router.navigate(['/admin/posts']);
        // window.location.reload();

      });
    }
  }

  declinePost(id: any) {
    if ( confirm('This action will decline this post')) {
      this.forumService.declinePost(id).subscribe((response) => {
        // console.log(response);
        this.alertify.success('post has been declined successfully');
      }, error => {
        // console.log(error);
        this.alertify.error('error declining the post, please retry');
      }, () => {
        this.forumService.reloadPage = true;
        // this.router.navigateByUrl('/admin/users-list');
        this.router.navigate(['/admin/posts']);
        // window.location.reload();
      });
    }
  }

}
