import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { VersionService } from './version.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteDialogComponent } from '../../core/elements/dialog/delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';
import { VersionManagementComponent } from './version-management.component';

@Component({
  selector: 'app-versions-list-component',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.scss'],
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
export class VersionListComponent implements OnInit {

  versions: any = [];
  // dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  defaultVersion: any = {
    id: 0,
    name: '',
    code: ''
  };

  constructor(private versionService: VersionService, 
              private snackbar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.versionService
      .getVersions()
      .subscribe(
          data => {
            this.versions = data;
          },
          error => {
            //Error
            //console.log(error);
          },
          () => {
            // No error code
          });
  }

  addVersion() {
    // this.versions.push({id:100, name: "100", code: 'C100'});
    // this.updateTable(1);
    let dialog = this.dialog.open(VersionManagementComponent,  {
      width: '600px',
      height: '420px',
      minHeight: '400px',
      disableClose: false,
      autoFocus: true,
      data: this.defaultVersion
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.versions.push(result);
        this.snackbar.open('Succesfully added', 'Close', {
          duration: 4000,
        });
      }
    });
  }

  updateVersion(rowData) {
    // this.versions.push({id:100, name: "100", code: 'C100'});
    // this.updateTable(1);

    let dialog = this.dialog.open(VersionManagementComponent,  {
      width: '600px',
      height: '420px',
      minHeight: '400px',
      disableClose: false,
      autoFocus: true,
      data: rowData
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        // this.versions.push(result);
        var ver = this.versions.find(vers=>{
          return vers.id == result.id;
        })
        if (ver) {
          ver['name'] = result.name;
          ver['code'] = result.code;
        }
        this.snackbar.open('Succesfully updated', 'Close', {
          duration: 4000,
        });
      }
    });
  }

  deleteLink(id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialog = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.versionService
            .deleteVersion(id)
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
            }); 
      }
    });

    event.stopPropagation();
    
    return;
  }

  updateTable(id) {
    let index = this.versions.findIndex( (item): boolean => {
                if (item.id == id){
                  // item.status_id = 0;
                  return true;
                }
              });

    if (index > -1) {
      this.versions.splice(index, 1);
    }
  }

  // trackByFn(index, item) {
  //   return index; // or item.id
  // }

  onRowSelect(event) {    
    // this.router.navigate([`task/type/${event.data.type_id}`]);
    console.log(event.data);
    this.updateVersion(event.data);
  }
}
