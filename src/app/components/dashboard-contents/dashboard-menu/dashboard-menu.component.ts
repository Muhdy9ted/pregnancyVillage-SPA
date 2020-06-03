import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss']
})
export class DashboardMenuComponent implements OnInit {

  @Output() profileClicked = new EventEmitter<string>();
  @Output() cartClicked = new EventEmitter<string>();
  // firstname = this.authService.firstnameURL;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onProfileClicked() {
    this.profileClicked.emit('profile');
  }

  oncartClicked() {
    this.cartClicked.emit('cart');
  }
}
