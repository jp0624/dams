import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../course.service';
import { GlobalService }    from '../../../../services/global.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from '../../../../core/elements/dialog/delete/delete.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses;
  private sts;
  //courseMap: Map<number, any>;

  constructor(
    private courseService: CourseService,
    private globalService: GlobalService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {  }
  
  ngOnInit() {
    this.getCourses()
  }

	getCourses() {
    this.courseService
      .getCourses()
      .subscribe((data) => {
        this.courses = data;
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      })
  }
  onRowSelect(event) {
    this.router.navigate([`/course/${event.data.id}`]);
  }

  deleteLink(event: Event, id) {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialog = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.deleteCourse(id)
                    .subscribe(result => {
                      console.log(' subscribe - ' + result);
                      this.updateTable(id);
                      if (result === true) {
                        this.snackbar.open('Succesfully deleted', 'Close', {
                          duration: 4000,
                        });
                      }
                    },
                    error => {
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

  updateTable(id) {
    let index = this.courses.findIndex( (item): boolean => {
                if (item.id == id){
                  return true;
                }
              });
    if (index > -1) {
      this.courses.splice(index, 1);
    }
  }

}
