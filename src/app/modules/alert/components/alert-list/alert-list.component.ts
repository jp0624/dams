import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertService } from '../../alert.service';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteDialogComponent } from '../../../../core/elements/dialog/delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss'],
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

export class AlertListComponent implements OnInit {
  alerts: any = [];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(private alertService: AlertService, 
              private snackbar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    }

    this.alertService.getAlerts()
                        .subscribe(
                                  data => {
                                    //console.log (data);
                                    this.alerts = data;
                                    this.dtTrigger.next();
                                  },
                                  error => {
                                    //Error
                                    console.log(error);
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
        this.alertService.deleteAlert(id)
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
  }

  updateTable(id){
    let index = this.alerts.findIndex( (item): boolean => {
                if (item.alert_id == id){
                  return true;
                }
              });
    if (index > -1) {
      this.alerts.splice(index, 1);
    }
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

}
