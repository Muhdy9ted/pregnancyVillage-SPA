import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {SidebarModule} from 'primeng/sidebar';
import {DialogModule} from 'primeng/dialog';
import { JwtModule } from '@auth0/angular-jwt';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { TimeagoModule } from 'ngx-timeago';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandingPageComponent } from './components/landingPage/landing-page/landing-page.component';
import { LoginModalComponent } from './components/landingPage/login-modal/login-modal.component';
import { RegisterComponent } from './components/landingPage/register/register.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptorProvider } from './_shared/services/error.interceptor';
import { DashboardComponent } from './components/dashboard-contents/dashboard/dashboard.component';
import { ProfileComponent } from './components/dashboard-contents/profile/profile.component';
import { DashboardMenuComponent} from './components/dashboard-contents/dashboard-menu/dashboard-menu.component';
import { DashboardCurrentViewComponent } from './components/dashboard-contents/dashboard-current-view/dashboard-current-view.component';
import { CartComponent } from './components/dashboard-contents/cart/cart.component';
import { DashboardControllerComponent } from './components/dashboard-contents/dashboard-controller/dashboard-controller.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/dashboard-contents/post/post.component';
import { AddPostComponent } from './components/dashboard-contents/post/add-post/add-post.component';
import { ViewPostsComponent } from './components/dashboard-contents/post/view-posts/view-posts.component';
import { ProductsComponent } from './components/dashboard-contents/products/products.component';
import { AddProductComponent } from './components/dashboard-contents/products/add-product/add-product.component';
import { ViewProductsComponent } from './components/dashboard-contents/products/view-products/view-products.component';
import { ForumComponent } from './components/forum/forum.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PostCardComponent } from './components/dashboard-contents/post/view-posts/post-card/post-card.component';
import { PostsListComponent } from './components/dashboard-contents/post/view-posts/posts-list/posts-list.component';
import { GetPostsResolver } from './_shared/resolvers/getPosts.resolver';
import { PostsDetailComponent } from './components/dashboard-contents/post/view-posts/posts-detail/posts-detail.component';
import { GetPostResolver } from './_shared/resolvers/getPost.resolver';
import { CommentComponent } from './components/dashboard-contents/post/view-posts/posts-detail/comment/comment.component';
import { GetProfileInfoResolver } from './_shared/resolvers/getProfile-info.resolver';
import { TextMaskModule } from 'angular2-text-mask';
import { FooterComponent } from './components/footer/footer.component';
import { GetCategoriesPostsLPageResolver } from './_shared/resolvers/getCategoriesPostLPage.resolver';
import { WelcomePageComponent } from './components/landingPage/welcome-page/welcome-page.component';
import { GetForumPostsResolver } from './_shared/resolvers/getForumPosts.resolver';
import { ForumDetailComponent } from './components/forum/forum-detail/forum-detail.component';
import { GetPostForumResolver } from './_shared/resolvers/getPostForum.resolver';
import { CommentListComponent } from './components/dashboard-contents/post/view-posts/posts-detail/comment/comment-list/comment-list.component';
import { PostByCategoryComponent } from './components/forum/post-by-category/post-by-category.component';
import { GetPostsByCategory } from './_shared/resolvers/getPostsByCategory.resolver';
import { PreventUnsavedChanges } from './_shared/guards/prevent-unsaved-changes.guard';
import { SpinnerComponent } from './components/spinners/spinner/spinner.component';
import { SpinnerOverlayWrapperComponent } from './components/spinners/spinner-overlay-wrapper/spinner-overlay-wrapper.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RightSideBarComponent } from './components/right-side-bar/right-side-bar.component';
import { EditPostComponent } from './components/dashboard-contents/post/edit-post/edit-post.component';

export function tokenGetter() {
  return (localStorage.getItem('preg_token'));
  // const token =  JSON.parse(localStorage.getItem('token'));
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginModalComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    DashboardMenuComponent,
    DashboardCurrentViewComponent,
    CartComponent,
    DashboardControllerComponent,
    NavbarComponent,
    PostComponent,
    AddPostComponent,
    ViewPostsComponent,
    ProductsComponent,
    AddProductComponent,
    ViewProductsComponent,
    ForumComponent,
    PostCardComponent,
    PostsListComponent,
    PostsDetailComponent,
    CommentComponent,
    FooterComponent,
    WelcomePageComponent,
    ForumDetailComponent,
    CommentListComponent,
    PostByCategoryComponent,
    SpinnerComponent,
    SpinnerOverlayWrapperComponent,
    PageNotFoundComponent,
    RightSideBarComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    SidebarModule,
    NgxPaginationModule,
    DialogModule,
    TextMaskModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FileUploadModule,
    FontAwesomeModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TimeagoModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['pregnancy-village.herokuapp.com'],
        blacklistedRoutes: ['https://pregnancy-village.herokuapp.com/v1/forum/auth']
      }
    })
  ],
  providers: [ErrorInterceptorProvider, GetPostsResolver, GetPostResolver, GetProfileInfoResolver,
     GetCategoriesPostsLPageResolver, GetForumPostsResolver, GetPostForumResolver, GetPostsByCategory,  PreventUnsavedChanges],
  bootstrap: [AppComponent]

})
export class AppModule { }
