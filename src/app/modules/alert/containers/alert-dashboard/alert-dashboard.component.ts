import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-dashboard',
  templateUrl: './alert-dashboard.component.html',
  styleUrls: ['./alert-dashboard.component.scss']
})
export class AlertDashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

}
