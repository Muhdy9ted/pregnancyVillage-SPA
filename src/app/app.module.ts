import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';



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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  providers: [ErrorInterceptorProvider],
  bootstrap: [AppComponent]

})
export class AppModule { }
