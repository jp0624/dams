import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../status.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from '../../../../core/elements/dialog/delete/delete.component';

@Component({
  selector: 'app-status-list',
	providers: [
    StatusService
  ],
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent implements OnInit {
  statuses;

  constructor(
    private statusService: StatusService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {  }
  
  ngOnInit() {
    this.getStatuses();
  }

	getStatuses() {
    this.statusService
      .getStatuses()
      .subscribe((data) => {
        this.statuses = data;
      })
  }

  onRowSelect(event) {
    this.router.navigate([`/status/${event.data.status_id}`]);
  }

  deleteLink(event: Event, id) {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialog = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.statusService.delete(id)
                    .subscribe(result => {
                      //console.log('success');
                      if (result) {
                        this.updateTable(id);
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

  updateTable(id) {
    let index = this.statuses.findIndex( (item): boolean => {
                if (item.status_id == id){
                  return true;
                }
              });
    if (index > -1) {
      this.statuses.splice(index, 1);
    }
  }

}