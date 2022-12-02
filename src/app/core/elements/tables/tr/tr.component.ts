import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Route, } from '@angular/router';

import { ModalService } from '../../../../modules/modal/modal.service';
import { GlobalService } from '../../../../services/global.service';

import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteDialogComponent } from "../../dialog/delete/delete.component";

@Component({
  selector: 'app-tr',
  templateUrl: './tr.component.html',
  styleUrls: ['./tr.component.scss']
})
export class TrComponent implements OnInit {
  @Input()
  sortableIndex: any;
  @Input('data') data;
  @Input('type') type;
  @Input('keys') keys;
  @Input('primary') primary;
  @Input('section') section;

  @Input()
  selectable: boolean;
  @Input()
  index;
  @Input()
  destination: any;
  @Input()
  sortable: any;
  @Input()
  linktable: any;

  @Output()
  itemSelected = new EventEmitter<any>();
  @Output()
  orderChanged = new EventEmitter<any>();
  @Output()
  itemRemoved = new EventEmitter<any>();

  router: Router;
  private changeData;
  private removeItem;

  constructor(
    private modalService: ModalService
    ,private globalService: GlobalService
    ,router: Router
    ,private dialog: MatDialog
  ) {
    this.router = router;
  }

  ngOnInit() {
    //console.log('IS THIS SELECTABLE? ', this.selectable)
    this.data.order = this.index;
    //console.log('DATA IN TR: ', this.data)
    //console.log('Primary IN TR: ', this.data[this.primary])
    ////console.log('ROW TYPE: ', this.type)
    ////console.log('ROW DATA: ', this.data)
    //console.log('section IN TR: ', this.section)
  }
  changeOrder(id, order, dir) {
    this.changeData = {
      id,
      order,
      dir
    }
    this.orderChanged.emit(this.changeData);
  }
  removeRow(link_id) {
    this.removeItem = link_id;
    this.itemRemoved.emit(this.removeItem);
  }

  deleteLink(linktable, primary_key, link_id) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialog = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.globalService
        .removeLink(linktable, primary_key, link_id)
        .subscribe((data) => {
          //console.log('RESPONSE FROM GET REMOVE LINK REQUEST: ', data);

          if (data.affectedRows === 1) {
            this.removeRow(link_id)
          }
        });
      }
    });


  }

  selectItem(id, index) {
    //console.error('ID: ', id);
    //console.error('INDEX: ', index);
    let item = {
      'id': id,
      'index': index
    }
    this.itemSelected.emit(item);
  }
  viewThis(id, destination, index) {
    //this.router.navigate([ '/' + this.section + '/', { id: id, other: otherparam }]);
    //console.log('VIEW THIS ID: ', id);
    if (destination === 'modal') {
      //console.log('TR CALLING MODAL FUNCTION - tr.component.ts: ', index);

      if (this.selectable) {
        //console.log('SELECTED ID: ', id);
        this.selectItem(id, this.index);

      } else {
        this.modalService.changeModalType('edit', id);
      }
    } else {
      this.router.navigate(['/' + this.section + '/' + id]);
    }
  }
}
