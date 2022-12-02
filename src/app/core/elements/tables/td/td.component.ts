import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-td',
  templateUrl: './td.component.html',
  styleUrls: ['./td.component.scss']
})
export class TdComponent implements OnInit {
  @Input('data') data;
  @Input('key') key;

  class = "class";
  text = "text";

  constructor() { }

  ngOnInit() {
    ////console.log('key: ', this.key)
  }

}
