import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';



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
import { JwtModule } from '@auth0/angular-jwt';
import { FileUploadModule } from 'ng2-file-upload';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    FileUploadModule,
    FontAwesomeModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['pregnancy-village.herokuapp.com'],
        blacklistedRoutes: ['https://pregnancy-village.herokuapp.com/v1/forum/auth']
      }
    })
  ],
  providers: [ErrorInterceptorProvider],
  bootstrap: [AppComponent]

})
export class AppModule { }
