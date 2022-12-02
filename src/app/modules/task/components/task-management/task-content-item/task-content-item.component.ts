import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TaskGroupModalComponent } from '../task-content-container/task-group-modal/task-group-modal.component';
import { TaskVersionsInputComponent } from '../task-content-container/task-versions-input/task-versions-input.component';
import { GlobalService } from '../../../../../services/global.service';

@Component({
  selector: 'app-task-content-item',
  templateUrl: './task-content-item.component.html',
  styleUrls: ['./task-content-item.component.css']
})

export class TaskContentItemComponent implements OnInit {
  //panelOpenState: boolean = false;
  @Input() allExpandState: boolean;
  @Input() group: any = {};
  @Output() moveUp : EventEmitter<number> = new EventEmitter();
  @Output() moveDown : EventEmitter<number> = new EventEmitter();
  @Output() deleteGroup : EventEmitter<number> = new EventEmitter();
  @Output() editGroupContent : EventEmitter<number> = new EventEmitter();
  @Output() addVersionData : EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog, 
    public globalService: GlobalService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onUp(id, order, event) {
    event.stopPropagation();
    if (order && order > 0) {
      this.moveUp.emit(order);
    }
  }

  onDown(id, order, event) {
    event.stopPropagation();
    this.moveDown.emit(order);
  }

  onDelete(id, order, event) {
    event.stopPropagation();
    this.deleteGroup.emit(order);
  }

  onEdit(group, event) {
    event.stopPropagation();
    this.editGroupContent.emit(group);
  }

  addVersions(groupid, attrid) {
    console.log(groupid);
    console.log(attrid);
    localStorage.setItem('groupid', groupid);
    let dialog = this.dialog.open(TaskGroupModalComponent,  {
      width: '800px',
      height: '700px',
      minHeight: '500px',
      disableClose: false,
      autoFocus: true,
      data: { component: TaskVersionsInputComponent, groupid: groupid, attrid: attrid }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
       console.log(result);
      }

      this.addVersionData.emit( { groupid: localStorage.getItem('groupid'), content: result } );
    });
  }
  
}
