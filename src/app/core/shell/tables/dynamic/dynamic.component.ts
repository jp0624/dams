import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamicTable',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicTableComponent implements OnInit {
  @Input()
    data: any;
  @Input()
    primary: any;
  @Input()
    section: any;
  @Input()
    destination: any;
  @Input()
    sortable: any;
  @Input()
    linktable: any;
  @Input()
    selectable: boolean;
  @Input()
    selected;
    
    @Output()
      itemsSelected = new EventEmitter<any>(); 

  keys: any;

  constructor() {
  }
  selectedItems(event){
    //console.log('SELETCED ITEMS EVENT <DYNAMIC TABLE>: ', event)
    this.itemsSelected.emit(event);
  }

  ngOnInit() {
    //console.error('LINK TABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', this.linktable);
      if(this.data.length != 0) {
        this.data.length
        this.keys = Object.keys(this.data[0]);
      } else {
        this.data = false;
      }
  }

}
