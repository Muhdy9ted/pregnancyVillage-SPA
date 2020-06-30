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
import { MemberProfileComponent } from './components/members-contents/member-profile/member-profile.component';
import { GetProfileInfoResolver } from './_shared/resolvers/getProfile-info';
import { GetCategoriesPostsLPageResolver } from './_shared/resolvers/getCategoriesPostLPage.resolver';
import { WelcomePageComponent } from './components/landingPage/welcome-page/welcome-page.component';
import { ForumComponent } from './components/forum/forum.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent, resolve: {categoryPosts: GetCategoriesPostsLPageResolver}},
  {path: 'activated', component: WelcomePageComponent},
  {path: 'forum', component: ForumComponent},
  { path: ':userId', component: DashboardControllerComponent , runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'profile', component: ProfileComponent, resolve: {user: GetProfileInfoResolver}},
    { path: 'cart', component: CartComponent},
    { path: 'post', component: PostComponent, children: [
      { path: 'add-post', component: AddPostComponent},
      { path: 'my-posts', component: ViewPostsComponent, resolve: {posts: GetPostsResolver}, children: [
        {path: ':postId', component: PostsDetailComponent, resolve: {post: GetPostResolver}}
      ]}
    ]},
    {path: 'product', component: ProductsComponent, children: [
      {path: 'add-product', component: AddProductComponent},
      {path: 'my-products', component: ViewProductsComponent}
    ]}
  ]},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
