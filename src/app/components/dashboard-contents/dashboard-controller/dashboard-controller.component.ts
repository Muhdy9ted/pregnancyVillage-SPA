import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-controller',
  templateUrl: './dashboard-controller.component.html',
  styleUrls: ['./dashboard-controller.component.scss']
})
export class DashboardControllerComponent implements OnInit {

  viewSelectedString: string;

  constructor() { }

  ngOnInit(): void {
  }

  viewSelected(event: any) {
    console.log(event);
    this.viewSelectedString = event;
  }
}
