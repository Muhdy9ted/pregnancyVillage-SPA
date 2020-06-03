import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // viewSelectedString: string;

  constructor() { }

  ngOnInit(): void {
  }

  // viewSelected(event: any) {
  //   console.log(event);
  //   this.viewSelectedString = event;
  // }
}
