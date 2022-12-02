import { Component, OnInit, Input } from '@angular/core';
import { GlobalService }    from '../../../../services/global.service';

import { QuestionService }  from '../../../../core/shell/forms/question/question.service';
import { TaskService }  from '../../../task/task.service';
import { ModalService }  from '../../modal.service';
import { MessagingService } from '../../../messaging/messaging.service';

@Component({
  selector: 'app-modal-task-attr-version',
  templateUrl: './modal-task-attr-version.component.html',
  styleUrls: ['./modal-task-attr-version.component.scss']
})
export class ModalTaskAttrVersionComponent implements OnInit {
  @Input()
    content_id;
    
  vers;
  
  private group_id;
  private attr_id;

  constructor(
    private globalService: GlobalService,
    private questionservice: QuestionService,
    private modalService: ModalService,
    private taskService: TaskService,
    private messagingService: MessagingService
  ) { }

  ngOnInit() {
    this.getAttrData(this.content_id)
  }

  getAttrData(key){
    let ids = key.split('-');
    //console.log('SPLIT IDS: ', ids);
    
    this.attr_id = ids[0] || '';
    this.group_id = ids[1] || '';
    this.getVers();
  }

  addVersion(id){
    this.vers[id].status = true;
    //console.log('VERS: ', this.vers)
  }
  removeVersion(id){
    this.vers[id].status = false;
    //console.log('VERS: ', this.vers)
  }
  checkStatus(vers) {
    //console.log('vers: ', vers)
    for(let i in vers){
      this.taskService
        .getAttrVerStatus(this.attr_id + '-' + this.group_id + '-' + vers[i].version_id)
        .subscribe((data) => {
          //console.log('STATUS DATA: ', data)
            if(data && data.length > 0){
              this.vers[i].status = true;
            } else {
              this.vers[i].status = false;
            }
        })
    }
  }
  //putAttrVersion

  updateVersions() {
    //console.log('vers: ', this.vers)
    //console.error('>>>>>>>>>>>>>>>>>>>>>>>>> TOTAL COUNT TO: ', this.vers.length)
    let count = 0;
    for(let i in this.vers) {

      let version = {
        group_id: this.group_id,
        attr_id: this.attr_id,
        version_id: String(this.vers[i].version_id)
      }

      if(this.vers[i].status) {
        count++;
        //console.log('PUT THIS VERSION: ', this.vers[i])
        this.taskService
          .putAttrVersion(version)
          .subscribe((data) => {
            //console.error('>>>>>>>>>>>>>>>>>>>>>>>>> add COUNT: ', count);
            //console.error('RESPONSE DATA: ', data)
          },
          error => {
                    console.log(error);
                  },
          () => { 
              //console.log('No error code');
              // No error, some logic
          })

      } else {
        count++;
        //console.log('REMOVE/DONT PUT THIS VERSION: ', this.vers[i])
        this.taskService
          .removeAttrVersion(version)
          .subscribe((data) => {
            ////console.error('>>>>>>>>>>>>>>>>>>>>>>>>> COUNT: ', count);
            //console.error('RESPONSE DATA: ', data)
          },
          error => {
                    console.log(error);
                  },
          () => { 
              //console.log('No error code');
              // No error, some logic
          })
      }

        if(count === this.vers.length) {
          //COMPLETE
          //this.modalService.hideModal()
          this.taskService.emitUpdatedTaskTypeGroup(true);
          this.messagingService.showMessage('success', 'Success!', `Versions updated successfully!`) 
        }

    }

  }

  getVers() {
    this.globalService
      .getVersions()
      .subscribe((data) => {
        this.vers = data;
        this.checkStatus(this.vers);
      })
  }

}
