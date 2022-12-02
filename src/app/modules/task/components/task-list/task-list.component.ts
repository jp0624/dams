import { Component, Input, Output, OnInit, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';

import { TaskService } from '../../task.service';
import { LessonService } from '../../../lesson/lesson.service';
import { PaginationComponent } from '../../../../core/elements/pagination/pagination.component';
import { LazyLoadEvent } from '../../../../utils/primeng/common/lazyloadevent';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from '../../../../core/elements/dialog/delete/delete.component';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @ViewChild(PaginationComponent) paginationComponent;
  // @ViewChild('pt') pt: any;
  @Input()
    id: any;
  @Input()
    modal: any;
  @Input()
    destination: any;
  @Output() task_id = new EventEmitter();

  lessons;
  tasks;
  private lessonTasks;

  //Pagination code
  public totalRecords: number = 0;
  public defaultPageSize: number = 10;

  public gridInfo: any = {
    first: 0, 
    rows: 5, 
    sortField: 'name', 
    sortOrder: 'ASC', 
    filterText: ''
  };

  constructor(
    private taskService: TaskService,
    private lessonService: LessonService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {  }

  ngOnInit() {
    if(this.id) {
      this.getLessonTasks(this.id)
    } else {
      this.getTasks(this.gridInfo.first, this.gridInfo.rows, this.gridInfo.sortField, this.gridInfo.sortOrder, this.gridInfo.filterText);
    }
  }

	getTasks(startindex, pagesize, sortfield, sortorder, searchtext) {
    this.taskService
      .getTasks(startindex, pagesize, sortfield, sortorder, searchtext)
      .subscribe((data) => {
        if (data && data[0]) {
          this.tasks = data[0];
          this.totalRecords = data[1][0]['@totalRecords'];
        }
      })
  }

	getLessonTasks(id) {
    this.lessonService
      .getLessonTasks(id)
      .subscribe((data) => {
        this.lessonTasks = data;
      })
  }

  changeTask(task_id) {
    this.task_id.emit(task_id);
  }
  
  //Pagination code
  OnNavButtonClick = function(op) {
    this.getTasks(op.pageNo, op.pageSize);
  }

  loadTasksLazy(event: LazyLoadEvent) {
    const filterText = event.globalFilter ? event.globalFilter: '';
    const sortField = event.sortField ? event.sortField : 'name';
    const sortOrder = event.sortOrder === 1 ? 'ASC' : 'DESC';

    this.gridInfo = {
      first: event.first, 
      rows: event.rows, 
      sortField: sortField, 
      sortOrder: sortOrder, 
      filterText: filterText
    };

    this.getTasks(event.first, event.rows, sortField, sortOrder, filterText);
  }

  onRowSelect(event) {    
    if (this.destination == 'modal') {
      this.changeTask(event.data.id);
      
    }
    else {
      this.router.navigate([`task/${event.data.id}`]);
    }
    
  }

  deleteLink(event: Event, id, gridInfo) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialog = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(id)
                    .subscribe(result => {
                      //console.log('success');

                      if (result) {
                        this.getTasks(gridInfo.first, gridInfo.rows, gridInfo.sortField, gridInfo.sortOrder, gridInfo.filterText);
                        this.snackbar.open('Succesfully deleted', 'Close', {
                          duration: 4000,
                        });
                      }
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
  
}