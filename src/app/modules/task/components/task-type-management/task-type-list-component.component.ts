import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskService } from '../../task.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteDialogComponent } from '../../../../core/elements/dialog/delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';
    
@Component({
  selector: 'app-task-type-list-component',
  templateUrl: './task-type-list-component.component.html',
  styleUrls: ['./task-type-list-component.component.scss'],
  animations: [
    trigger('rowState', [
      state('*', style({
          opacity: 1,
          transform: 'scale(1)'
        })),
        state('void', style({
          opacity: 0,
          transform: 'scale(0)'
        })),
        transition('* => void, void => *', animate('500ms ease-in-out'))
    ])
  ]
})
export class TaskTypeListComponent implements OnInit {

  taskTypes: any = [];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(private taskService: TaskService, 
              private snackbar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10
    // }

    this.taskService.getAllTaskType()
                        .subscribe(
                                  data => {
                                    //console.log (data);
                                    this.taskTypes = data;
                                    this.dtTrigger.next();
                                  },
                                  error => {
                                    //Error
                                    //console.log(error);
                                  },
                                  () => {
                                    // No error code
                                  });
  }

  deleteLink(id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialog = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTaskType(id)
            .subscribe(result => {
              //console.log('success');
              this.updateTable(id);
              this.snackbar.open('Succesfully deleted', 'Close', {
                duration: 4000,
              });
            },
            error => {
                this.snackbar.open('Not deleted: ' + error.error.sqlMessage, 'Close', {
                  duration: 4000,
                });
                console.log(error);
            },
            () => {
              //no error logic here
            }); }
    });

    event.stopPropagation();
    
    return;
  }

  updateTable(id) {
    let index = this.taskTypes.findIndex( (item): boolean => {
                if (item.type_id == id){
                  // item.status_id = 0;
                  return true;
                }
              });

    if (index > -1) {
      this.taskTypes.splice(index, 1);
    }
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  onRowSelect(event) {    
    this.router.navigate([`task/type/${event.data.type_id}`]);
  }

}
