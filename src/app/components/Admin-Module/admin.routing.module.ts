import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from 'src/app/_shared/guards/auth.guard';
import { UsersComponent } from './users/users.component';
import { GetAllUsersResolver } from 'src/app/_shared/resolvers/getAllUsers.resolver';
import { CurrentPostsComponent } from './current-posts/current-posts.component';
import { GetPostsAdminResolver } from 'src/app/_shared/resolvers/getPostsAdmin.resolver';
import { CategoriesComponent } from './categories/categories.component';
import { GetCategoriesAdminResolver } from 'src/app/_shared/resolvers/getCategoriesAdmin.resolver';


const routes: Routes = [
    {path: '', component: AdminComponent, children: [
        // localhost:4200/userid
        { path: '', redirectTo: 'login', pathMatch: 'full'},
        {path: 'login', component: AdminLoginComponent},
        {path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
        { path: 'users-list', component: UsersComponent, canActivate: [AuthGuard], resolve: {users: GetAllUsersResolver}},
        { path: 'posts', component: CurrentPostsComponent, canActivate: [AuthGuard], resolve: {posts: GetPostsAdminResolver}},
        { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard], resolve: {categories: GetCategoriesAdminResolver}}
    ]}
];

@NgModule({
    // imports: [RouterModule.forChild(routes,  {onSameUrlNavigation: 'reload'})],
    imports: [RouterModule.forChild(routes)],

    exports: [RouterModule]
})
export class AdminRoutingModule {}
