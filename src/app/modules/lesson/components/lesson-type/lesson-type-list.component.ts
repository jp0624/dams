import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LessonService } from '../../lesson.service';
import { RouterLink, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteDialogComponent } from '../../../../core/elements/dialog/delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-lesson-type-list',
  templateUrl: './lesson-type-list.component.html',
  styleUrls: ['./lesson-type-list.component.scss'],
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

export class LessonTypeListComponent implements OnInit {
  lessonTypes: any = [];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(private lessonService: LessonService, 
              private snackbar: MatSnackBar,
              private dialog: MatDialog,
              private router: Router
            ) { }

  ngOnInit() {

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10
    // }

    this.lessonService.getLessonTypes()
                        .subscribe(
                                  data => {
                                    //console.log (data);
                                    this.lessonTypes = data;
                                    //this.dtTrigger.next();
                                  },
                                  error => {
                                    //Error
                                    console.log(error);
                                  },
                                  () => {
                                    // No error code
                                  });
  }

  deleteLink(event: Event, id) {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialog = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.lessonService.deleteLessonType(id)
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

  updateTable(id){
    let index = this.lessonTypes.findIndex( (item): boolean => {
                if (item.type_id == id){
                  return true;
                }
              });
    if (index > -1) {
      this.lessonTypes.splice(index, 1);
    }
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  onRowSelect(event) {
    this.router.navigate([`/lesson/type/${event.data.type_id}`]);
  }

}
