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

@NgModule({
    declarations: [AdminComponent],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        AdminRoutingModule
    ],
    providers: [ErrorInterceptorProvider, ForumService, AuthService, AlertifyService, UserService]
})

export class AdminModule {}
