import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin.routing.module';

@NgModule({
    declarations: [AdminComponent],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        AdminRoutingModule
    ]
})

export class AdminModule {}
