import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landingPage/landing-page/landing-page.component';
import { ProfileComponent } from './components/dashboard-contents/profile/profile.component';
import { AuthGuard } from './_shared/guards/auth.guard';
import { DashboardComponent } from './components/dashboard-contents/dashboard/dashboard.component';
import { CartComponent } from './components/dashboard-contents/cart/cart.component';
import { DashboardControllerComponent } from './components/dashboard-contents/dashboard-controller/dashboard-controller.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  { path: ':user', component: DashboardControllerComponent , runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'cart', component: CartComponent},
  ]},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
