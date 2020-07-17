import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin.routing.module';
import { ErrorInterceptorProvider } from 'src/app/_shared/services/error.interceptor';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { UserService } from 'src/app/_shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminfooterComponent } from './adminfooter/adminfooter.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UsersComponent } from './users/users.component';
import { GetAllUsersResolver } from 'src/app/_shared/resolvers/getAllUsers.resolver';
import { CurrentPostsComponent } from './current-posts/current-posts.component';
import { GetPostsAdminResolver } from 'src/app/_shared/resolvers/getPostsAdmin.resolver';
import { CategoriesComponent } from './categories/categories.component';
import { GetCategoriesAdminResolver } from 'src/app/_shared/resolvers/getCategoriesAdmin.resolver';
import { DialogModule } from 'primeng/dialog';


@NgModule({
    declarations: [
        AdminComponent,
        AdminNavbarComponent,
        AdminfooterComponent,
        AdminDashboardComponent,
        AdminLoginComponent,
        UsersComponent,
        CurrentPostsComponent,
        CategoriesComponent
    ],

    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        AdminRoutingModule,
        HttpClientModule,
        DialogModule,
        CollapseModule.forRoot(),

    ],
    providers: [ErrorInterceptorProvider, GetAllUsersResolver, GetPostsAdminResolver, GetCategoriesAdminResolver]
})

export class AdminModule {}
