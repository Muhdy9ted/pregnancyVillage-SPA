import { Injectable } from '@angular/core';
import { DashboardComponent } from 'src/app/components/dashboard-contents/dashboard/dashboard.component';
import { CanDeactivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class PreventUnsavedChanges implements CanDeactivate<DashboardComponent> {
    canDeactivate(component: DashboardComponent) {
        if (component.editProfileForm?.dirty) {
            return confirm('Are you sure you want to continue, any unsaved changes will be lost');
        }
        return true;
    }
}
