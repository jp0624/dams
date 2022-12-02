import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dynamicList',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicListComponent implements OnInit {
  @Input('data') data;
  @Input('keys') keys;
  @Input('editable') editable;
  
  constructor() { }

  ngOnInit() {
    //console.log('LODADED LIST DATA: ', this.data);
    //console.log('LODADED LIST KEYS DATA: ', this.keys);
  }

}
