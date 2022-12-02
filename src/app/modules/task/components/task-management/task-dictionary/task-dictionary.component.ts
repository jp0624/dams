import { Component, OnInit, OnDestroy, OnChanges, Input, SimpleChanges, Output } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { TaskService } from '../../../task.service';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../../../../core/elements/dialog/delete/delete.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { EventEmitter } from 'events';
import { DictionaryModalComponent } from './dictionary-modal/dictionary-modal.component';
import { elementAt } from 'rxjs-compat/operator/elementAt';

@Component({
  selector: 'app-task-dictionary',
  templateUrl: './task-dictionary.component.html',
  styleUrls: ['./task-dictionary.component.css']
})
export class TaskDictionaryComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dictionary : Array<any>;
  taskid: number;
  private sub: any;
  
  constructor( 
    private route: ActivatedRoute,
    public snackbar: MatSnackBar,
    private taskService: TaskService,
    private dialog: MatDialog
  ) { }

  dtTrigger: Subject<any> = new Subject();

  ngOnInit() {
    this.sub = this.taskService.urlTaskIdChange.subscribe(data => {
      if (data > 0) {
        this.taskid = +data;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }

  deleteLink(id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialog = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleTaskDictionary(id)
            .subscribe(result => {
              console.log('result:' + result);
              //console.log('success');
              this.updateTable(id);
              if (result && result.affectedRows) {
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
  }

  updateTable(id) {
    let index = this.dictionary.findIndex( (item): boolean => {
                if (item.task_dictionary_id == id){
                  return true;
                }
              });
    
    if (index > -1) {
      this.dictionary.splice(index, 1);
    }
  }

  addDictionaryTerms() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "700px";
    dialogConfig.maxWidth = "800px";
    dialogConfig.maxHeight = "800px";
    dialogConfig.data = { taskid: this.taskid, terms: [] };

    let dialog = this.dialog.open(DictionaryModalComponent, dialogConfig);

    dialog.afterClosed().subscribe(termsdata => {

      console.log(termsdata);
      if (termsdata && termsdata.terms.length != undefined && termsdata.terms.length > 0) {
        // let data = { taskid: this.taskid, terms: result };
        this.taskService.addTermsToTask(termsdata)
            .subscribe(result => {
              console.log('result:' + JSON.stringify(result));
              //console.log('success');
              //this.updateTable(id);
              let showMessage = false;
              if (result && result['length'] != undefined && result['length'] > 0) {
                
                result.forEach((element, ind) => {
                   if (element.insertId > 0) {
                     this.dictionary.push(
                       { 
                         task_dictionary_id: element.insertId, 
                         selector: termsdata.termsFullInfo[ind]['selector'], 
                         term: termsdata.termsFullInfo[ind]['term'], 
                         term_id: termsdata.termsFullInfo[ind]['term_id']
                        });
                     showMessage = true;
                   }
                 });
                //termsdata.termsFullInfo
              }
              else if (result) {
                //Single item entry
                if (result['insertId'] > 0) { 
                  this.dictionary.push(
                    { 
                      task_dictionary_id: result['insertId'], 
                      selector: termsdata.termsFullInfo[0]['selector'], 
                      term: termsdata.termsFullInfo[0]['term'], 
                      term_id: termsdata.termsFullInfo[0]['term_id']
                     });

                  showMessage = true;
                }
              }

              if (showMessage) {
                this.snackbar.open('Succesfully added the terms', 'Close', {
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

  }  
}
