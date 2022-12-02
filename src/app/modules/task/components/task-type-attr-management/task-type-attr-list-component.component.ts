import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskService } from '../../task.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteDialogComponent } from '../../../../core/elements/dialog/delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-type-attr-list-component',
  templateUrl: './task-type-attr-list-component.component.html',
  styleUrls: ['./task-type-attr-list-component.component.scss'],
  animations: [
    trigger('rowState', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('300ms', style({ opacity: 0, transform: 'scale(0)' })), {
          optional: true
        })
      ]),
    ])
  ]
})

export class TaskTypeAttrListComponent implements OnInit {

  taskAttrs: any = [];
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

    this.taskService.getAllTaskAttrGroups()
                        .subscribe(
                                  data => {
                                    //console.log (data);
                                    this.taskAttrs = data;
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
        this.taskService.deleteTaskAttrGroup(id)
                    .subscribe(result => {
                      //console.log('success');
                      this.updateTable(id);
                      this.snackbar.open('Succesfully deleted', 'Close', {
                        duration: 4000,
                      });
                    },
                    error => {
                        this.snackbar.open('Not deleted:' + error.error.sqlMessage, 'Close', {
                          duration: 4000,
                        });
                        console.log(error);
                    },
                    () => {
                      //no error logic here
                    }); 
      }
    });

    event.stopPropagation();
    
    return;
  }

  updateTable(id){
    let index = this.taskAttrs.findIndex( (item): boolean => {
                if (item.group_id == id){
                  return true;
                }
              });
    if (index > -1) {
      this.taskAttrs.splice(index, 1);
    }
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  onRowSelect(event) {
    this.router.navigate([`/task/type/attr/${event.data.group_id}`]);

  }

}
