import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landingPage/landing-page/landing-page.component';
import { ProfileComponent } from './components/dashboard-contents/profile/profile.component';
import { AuthGuard } from './_shared/guards/auth.guard';
import { DashboardComponent } from './components/dashboard-contents/dashboard/dashboard.component';
import { CartComponent } from './components/dashboard-contents/cart/cart.component';
import { DashboardControllerComponent } from './components/dashboard-contents/dashboard-controller/dashboard-controller.component';
import { PostComponent } from './components/dashboard-contents/post/post.component';
import { AddPostComponent } from './components/dashboard-contents/post/add-post/add-post.component';
import { ViewPostsComponent } from './components/dashboard-contents/post/view-posts/view-posts.component';
import { ProductsComponent } from './components/dashboard-contents/products/products.component';
import { AddProductComponent } from './components/dashboard-contents/products/add-product/add-product.component';
import { ViewProductsComponent } from './components/dashboard-contents/products/view-products/view-products.component';
import { GetPostsResolver } from './_shared/resolvers/getPosts.resolver';
import { PostsDetailComponent } from './components/dashboard-contents/post/view-posts/posts-detail/posts-detail.component';
import { GetPostResolver } from './_shared/resolvers/getPost.resolver';
import { GetCategoriesPostsLPageResolver } from './_shared/resolvers/getCategoriesPostLPage.resolver';
import { WelcomePageComponent } from './components/landingPage/welcome-page/welcome-page.component';
import { ForumComponent } from './components/forum/forum.component';
import { GetForumPostsResolver } from './_shared/resolvers/getForumPosts.resolver';
import { ForumDetailComponent } from './components/forum/forum-detail/forum-detail.component';
import { GetPostForumResolver } from './_shared/resolvers/getPostForum.resolver';
import { PostByCategoryComponent } from './components/forum/post-by-category/post-by-category.component';
import { GetPostsByCategory } from './_shared/resolvers/getPostsByCategory.resolver';
import { PreventUnsavedChanges } from './_shared/guards/prevent-unsaved-changes.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GetProfileInfoResolver } from './_shared/resolvers/getProfile-info.resolver';
import { EditPostComponent } from './components/dashboard-contents/post/edit-post/edit-post.component';


const routes: Routes = [

  // localhost:4200
  {path: '', component: LandingPageComponent, resolve: {categoryPosts: GetCategoriesPostsLPageResolver}},

  // localhost:4200/admin #lazyloading admin module
  { path: 'admin', loadChildren: () => import('./components/Admin-Module/admin.module').then(m => m.AdminModule)},

  // localhost:4200/welcome
  {path: 'confirmation/:token', component: WelcomePageComponent},

  // localhost:4200/forums/posts
  {path: 'forums/posts', component: ForumComponent, resolve: {posts: GetForumPostsResolver}},

  // localhost:4200/forums/posts/id
  {path: 'forums/posts/:postId', component: ForumDetailComponent,  resolve: {post: GetPostResolver}},

  //  localhost:4200/category/id
  {path: 'category/:categoryId', component: PostByCategoryComponent, resolve: {catPosts: GetPostsByCategory}},

  // localhost:4200/page-not-found
  {path: 'page-not-found', component: PageNotFoundComponent},

  // localhost:4200/userid
  {path: ':userId', component: DashboardControllerComponent , runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
    // localhost:4200/userid
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},

    // localhost:4200/userid/dashboard
    { path: 'dashboard', component: DashboardComponent, resolve: {user: GetProfileInfoResolver}, canDeactivate: [PreventUnsavedChanges]},

    // localhost:4200/userid/profile
    { path: 'profile', component: ProfileComponent, resolve: {user: GetProfileInfoResolver}},

    // localhost:4200/userid/cart
    { path: 'cart', component: CartComponent},

    { path: 'posts', component: PostComponent, children: [
      { path: '', redirectTo: 'my-posts', pathMatch: 'full'},
      // localhost:4200/userid/posts/add-post
      { path: 'add-post', component: AddPostComponent},

      // localhost:4200/userid/posts/my-posts
      { path: 'my-posts', component: ViewPostsComponent, resolve: {posts: GetPostsResolver}, children: [
        // localhost:4200/userid/post
        // {path: ':postId', component: PostsDetailComponent, resolve: {post: GetPostResolver}}
      ]},
      // localhost:4200/userid/posts/my-posts/postid
      {path: 'my-posts/:postId', component: PostsDetailComponent, resolve: {post: GetPostResolver}},

      // localhost:4200/userid/posts/my-posts/postid
      {path: 'my-posts/:postId/edit-post', component: EditPostComponent},

    ]},
    {path: 'product', component: ProductsComponent, children: [
      {path: 'add-product', component: AddProductComponent},
      {path: 'my-products', component: ViewProductsComponent}
    ]}
  ]},

  // localhost:4200/page-not-found
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
