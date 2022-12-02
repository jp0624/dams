import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LessonService } from '../../lesson.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from '../../../../core/elements/dialog/delete/delete.component';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {
  lessons;
  @Input()
    destination: any;
  @Output()
    lesson_id = new EventEmitter();
  @Input()
    modal: any;

	constructor(
    private lessonService: LessonService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {  }

  ngOnInit() {
    this.getLessons()
  }
  
	getLessons() {
    this.lessonService
      .getLessons()
      .subscribe((data) => {
        this.lessons = data;
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      })
  }

  changeLesson(lesson_id){
    this.lesson_id.emit(lesson_id);
  }
  
  onRowSelect(event) {
    if (this.destination == 'modal') {
      this.changeLesson(event.data.id);
    } 
    else {
      this.router.navigate([`/lesson/${event.data.id}`]);
    }
  }

  deleteLink(event: Event, id) {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialog = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.lessonService.deleteLesson(id)
                    .subscribe(result => {
                      //console.log('success');
                      this.updateTable(id);
                      this.snackbar.open('Succesfully deleted', 'Close', {
                        duration: 4000,
                      });
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
    let index = this.lessons.findIndex( (item): boolean => {
                if (item.id == id){
                  return true;
                }
              });
    if (index > -1) {
      this.lessons.splice(index, 1);
    }
  }

}

