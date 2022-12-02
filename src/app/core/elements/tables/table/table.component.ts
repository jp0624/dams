import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
  @Input('data') data;
  @Input('keys') keys;
  @Input('primary') primary;
  @Input('section') section;
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

  cols: number;
  styles: any;

  constructor() { }
  ngOnInit() {
    this.cols = this.keys.length;

    //console.error('LINK TABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', this.linktable);
    //console.log('TABLE CONTENT: ', this.data)
    //console.log('TABLE SECTION: ', this.section)
  }
  selectedItems(event){
    //console.log('SLEETCED ITEMS EVENT <table>: ', event)
    this.itemsSelected.emit(event);
  }
}
