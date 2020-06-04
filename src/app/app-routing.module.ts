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


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  { path: ':user', component: DashboardControllerComponent , runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'cart', component: CartComponent},
    { path: 'post', component: PostComponent, children: [
      { path: 'add-post', component: AddPostComponent},
      { path: 'my-posts', component: ViewPostsComponent}
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
