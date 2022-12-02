import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thead',
  templateUrl: './thead.component.html',
  styleUrls: ['./thead.component.scss']
})
export class TheadComponent implements OnInit {
  @Input('data') data;
  type = "head";

  constructor() { }

  ngOnInit() {
    //console.log('KEYS1: ', this.data)
  }

}
