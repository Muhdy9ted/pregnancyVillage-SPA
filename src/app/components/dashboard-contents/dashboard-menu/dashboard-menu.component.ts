import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss']
})
export class DashboardMenuComponent implements OnInit {

  visibleSidebar1;
  @Output() profileClicked = new EventEmitter<string>();
  @Output() cartClicked = new EventEmitter<string>();
  // firstname = this.authService.firstnameURL;
  isDroppedPost = false;
  isDroppedProduct = false;
  postItems: string[] = [
    'Add Post',
    'My Posts'
  ];
  productsItems: string[] = [
    'Add Product',
    'My Products'
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onProfileClicked() {
    this.profileClicked.emit('profile');
  }

  oncartClicked() {
    this.cartClicked.emit('cart');
  }

  // ngx-bootstrap dropdown
  // onHidden(): void {
  //   this.dropdownClicked = false;
  // }

  // onShown(): void {
  //   this.dropdownClicked = !this.dropdownClicked;
  // }

  isOpenChangePost() {
    this.isDroppedPost = !this.isDroppedPost;
    this.isDroppedProduct = false;
  }

  isOpenChangeProduct() {
    this.isDroppedProduct = !this.isDroppedProduct;
    this.isDroppedPost = false;

  }
}
