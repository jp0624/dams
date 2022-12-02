import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TaskGroupInputsComponent } from './task-group-inputs/task-group-inputs.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TaskGroupModalComponent } from './task-group-modal/task-group-modal.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { element } from 'protractor';
import { TaskService } from '../../../task.service';
import { TaskAttrInputsUpdateComponent } from './task-attr-inputs-update/task-attr-inputs-update.component';
import { DeleteDialogComponent } from '../../../../../core/elements/dialog/delete/delete.component';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
@Component({
  selector: 'app-task-content-container',
  templateUrl: './task-content-container.component.html',
  styleUrls: ['./task-content-container.component.css'],
  animations: [
    trigger('groupslist', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.2s', style({ opacity: .5, transform: 'scale(0.9)' })),
            animate('0.2s', style({ opacity: 0, transform: 'scale(0.1)' }))
          ])
        ], { optional: true }),
        // query(':enter', [
        //   style({ opacity: 0,  transform: 'translateY(-100vw)' }),
        //   stagger(100, [
        //     animate('0.2s', style({ opacity: .5, transform: 'translateY(-10vh)' })),
        //     animate('0.2s', style({ opacity: 1, transform: 'translateY(0vh)' }))
        //   ])
        // ], { optional: true })
      ])
    ])
  ]
})
export class TaskContentContainerComponent implements OnInit {
  @Input() groups: Array<any>;
  @Input() tasktypeid: number;
  @Input() taskid: number;
  currentIndex: number = 5;
  public allExpandState: boolean = true;
  constructor(private dialog: MatDialog, 
              private snackbar: MatSnackBar, 
              private taskService: TaskService) { }
  reorderList: Array<any> = [];

  ngOnInit() {
    //console.log(this.groups);
  }

  move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }

    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);

    return arr;
  }

  ChangeOrder(currentindex, type) {
    if (type === SortType.up){
      this.groups[currentindex-1]["order"] = this.groups[currentindex-1]["order"]+1;
      this.groups[currentindex]["order"] = this.groups[currentindex]["order"]-1;
      
      this.reorderList.push(
        {
          groupid: this.groups[currentindex-1]["group_id"],
          order: this.groups[currentindex-1]["order"]
        });
      this.reorderList.push(
          {
            groupid: this.groups[currentindex]["group_id"],
            order: this.groups[currentindex]["order"]
          });
      this.move(this.groups, currentindex, currentindex-1);
    } else {
      this.groups[currentindex+1]["order"] = this.groups[currentindex+1]["order"]-1;
      this.groups[currentindex]["order"] = this.groups[currentindex]["order"]+1;

      this.reorderList.push(
        {
          groupid: this.groups[currentindex+1]["group_id"],
          order: this.groups[currentindex+1]["order"]
        });
      this.reorderList.push(
          {
            groupid: this.groups[currentindex]["group_id"],
            order: this.groups[currentindex]["order"]
          });
      this.move(this.groups, currentindex, currentindex+1);
    }
  }

  onMoveUp(data) {
    this.currentIndex = +data;
    this.reorderList = [];
    this.ChangeOrder(this.currentIndex, SortType.up);
    //API Call
    //this.reorderList
    this.updateOrderInDb(this.reorderList);
  }

  onMoveDown(data) {
    if (data < this.groups.length) {
      this.currentIndex = +data;
      this.reorderList = [];
      this.ChangeOrder(this.currentIndex, SortType.down);
      this.updateOrderInDb(this.reorderList);
    }
  }

  updateOrderInDb(data) {
    if (data && data.length != undefined && data.length > 1) {
      this.taskService.updateGroupOrder(data)
      .subscribe(response=>{
        this.snackbar.open('Updated the task group order','Close', {
            duration: 3000,
          });
      },
      err => {
        this.snackbar.open('Error :' + err,'Close', {
          duration: 3000,
        });
        
      });
    }
  }

  addContent() {
    let dialogRef = this.dialog.open(TaskGroupModalComponent, {
      width: '800px',
      height: '700px',
      minHeight: '500px',
      data: { component: TaskGroupInputsComponent, 
        typeid: this.tasktypeid, 
        taskid: this.taskid}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log('After dialog close');
        // console.log(result);
        this.groups.push(result);
        this.snackbar.open('Succesfully added the task content', 'Close', {
          duration: 4000,
        });
      };
    });
  }

  
  // deleteLink(id) {
  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;

  //   let dialog = this.dialog.open(DeleteDialogComponent, dialogConfig);

  //   dialog.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.taskService.deleTaskDictionary(id)
  //           .subscribe(result => {
  //             console.log('result:' + result);
  //             //console.log('success');
  //             this.updateTable(id);
  //             if (result && result.affectedRows) {
  //               this.snackbar.open('Succesfully deleted', 'Close', {
  //                 duration: 4000,
  //               });
  //             }
  //           },
  //           error => {
  //               console.log(error);
  //           },
  //           () => {
  //             //no error logic here
  //           }); 
  //     }
  //   });
  // }

  onDeleteGroup(data) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialog = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(result => {
      if (result) {
        //Delete process
        let groupid = this.groups[data]["group_id"];
        this.groups.splice(data, 1);
    
        if (data < this.groups.length) { 
          this.groups.forEach((element, index) => {
            if (element.order > data) {
              element.order -= 1;
            }
          });
          //Delete API
          //groupid
        }
    
        if (groupid > 0) {
          this.taskService.deleteTaskGroup(groupid)
          .subscribe(response=>{
            this.snackbar.open('Successfully deleted the task group','Close', {
                duration: 3000,
              });
          },
          err => {
            this.snackbar.open('Error :' + err,'Close', {
              duration: 3000,
            });
            
          });
        }
      }
    });
  }

  onEditGroupContent(group) {
    let dialogRef = this.dialog.open(TaskGroupModalComponent, {
      width: '800px',
      height: '700px',
      minHeight: '500px',
      data: { component: TaskAttrInputsUpdateComponent, group: group }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log('After dialog close');
        // console.log(result);
        //update local group list
        this.updateGroup(result);
        //this.groups.push(result);
        this.snackbar.open('Succesfully added the task content', 'Close', {
          duration: 4000,
        });
      };
    });
  }

  updateGroup(data) {
    // this.groups.forEach

    let localgroup = this.groups.find( grp => grp.group_id === data.group_id );

    if (localgroup) {
      // console.log(localgroup);
      //group.content[0].value = 'sdsd';
      Object.keys(data.attributes).forEach(key=>{
        // console.log(data.attributes[key]);
        // console.log(key);
        let localitem = localgroup.content.find( cnt => cnt.id == key );
        if (localitem) {
          localitem.value = data.attributes[key];

        }
      })
    }
  }

  onAddVersionData(data) {
    var groupfound = this.groups.find(group => {
      return (group.group_id == data.groupid)
    });
    if (groupfound && data.content && data.content.length > 0) {
      groupfound.content = data.content;
    }

    if (data.content)
      this.snackbar.open('Succesfully added the version content', 'Close', {
        duration: 4000,
      });
  }
}

export enum SortType {
  'up',
  'down'
}
