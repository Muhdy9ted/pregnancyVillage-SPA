import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-current-view',
  templateUrl: './dashboard-current-view.component.html',
  styleUrls: ['./dashboard-current-view.component.scss']
})
export class DashboardCurrentViewComponent implements OnInit {

  @Input() currentViewString: string;

  constructor(private route: Router ) { }

  ngOnInit(): void {
  }

  onCurrentView() {
    // this.route.navigate([])
  }
}
