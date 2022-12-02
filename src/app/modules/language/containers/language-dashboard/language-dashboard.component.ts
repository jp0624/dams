import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-dashboard',
  templateUrl: './language-dashboard.component.html',
  styleUrls: ['./language-dashboard.component.scss']
})
export class LanguageDashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

}
