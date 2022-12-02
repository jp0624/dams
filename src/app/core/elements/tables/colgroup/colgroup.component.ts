import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-colgroup',
  templateUrl: './colgroup.component.html',
  styleUrls: ['./colgroup.component.scss']
})
export class ColgroupComponent implements OnInit {
  @Input('data') data;

  constructor() { }

  ngOnInit() {
  }

}
