import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-th',
  templateUrl: './th.component.html',
  styleUrls: ['./th.component.scss']
})
export class ThComponent implements OnInit {
  @Input('data') data;

  constructor() { }

  ngOnInit() {
  }

}
