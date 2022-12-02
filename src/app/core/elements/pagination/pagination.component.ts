import { Component, OnInit, Input, Output, SimpleChange, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
  @Input() 
  totalRecords : number = 0;
  @Input()
  defaultPageSize : number = 0;
  @Input()
  pageSizeList: Array<number> = [5, 10, 15, 20, 25, 50, 100, 500];
  @Output()
  navButtonClick: EventEmitter<any> = new EventEmitter<any>();

  emitterOutput: any = {
    pageNo: 0,
    pageSize: 0,
  }

  public size: number = 0;
  public sizeLocal: number = 0;
  public page: number = 1;
  public pageCount: number = 0;
  public changeLog: string[] = [];

  constructor() { }

  ngOnInit() {
    if (this.defaultPageSize === 0)
      this.size = this.pageSizeList[0];

    if (this.sizeLocal == 0)
      this.sizeLocal = this.defaultPageSize;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {

    let to: any;
    for (let propName in changes) {

      let changedProp = changes[propName];
      let to = changedProp.currentValue;
      if (changedProp.isFirstChange()) {
        //console.log(`Initial value of ${propName} set to ${JSON.stringify(to)}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        //console.log(`${propName} changed from ${from} to ${JSON.stringify(to)}`);
      }
      if (propName === 'totalRecords') {
        this.totalRecords = +to;
        // this.pageCount = Math.ceil( +to / this.size );
        // this.pageCount = isNaN(this.pageCount) ? 0 : this.pageCount;
      }
      else if (propName === 'pageSizeList') { 
        this.pageSizeList = to;
        if (this.size === 0) {
          this.size = this.pageSizeList[0];
        }
      }
      else if (propName === 'defaultPageSize') { 
        if (this.size === 0) {
          this.defaultPageSize = to;
          this.size = this.defaultPageSize;
        }
      }
    }

    this.pageCount = Math.ceil( this.totalRecords / this.size );
    this.pageCount = isNaN(this.pageCount) ? 0 : this.pageCount;
  }

  paginationClick(state) {
    let isUpdate: boolean;
    switch (state) {
      case PaginationState[PaginationState.First]: {
        if (this.page > 1) {
          this.page = 1;
          isUpdate = true;
        }
        
        break;
      }
      case PaginationState[PaginationState.Previous]: {
        if (this.page > 1)
        {
          this.page = this.page - 1;
          isUpdate = true;
        }

        break;
      }
      case PaginationState[PaginationState.Next]: {
        if (this.page < this.pageCount)
        {
          this.page = this.page + 1;
          isUpdate = true;
        }

        break;
      }
      case PaginationState[PaginationState.Last]: {
        if (this.page < this.pageCount) {
          this.page = this.pageCount;
          isUpdate = true;
        }
        
        break;
      }
      default: {
        //console.log('default');
        //console.log(PaginationState[PaginationState.First] === state);
      }
    }

    if (isUpdate)
    {
      this.updateEmitterData();
    }
     
  }

  OnSelectChange() {
    this.size = +this.sizeLocal;
    this.pageCount = Math.ceil( this.totalRecords / this.size );
    this.pageCount = isNaN(this.pageCount) ? 0 : this.pageCount;
    this.page = 1;
    this.updateEmitterData();
  }

  updateEmitterData() {
    this.emitterOutput.pageNo = this.page;
    this.emitterOutput.pageSize = this.size;

    this.navButtonClick.emit(this.emitterOutput);
  }

}

enum PaginationState {
  First,
  Previous,
  Next,
  Last
}
