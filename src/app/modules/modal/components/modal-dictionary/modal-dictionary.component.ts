import { Component, Input, OnInit } from '@angular/core';
import { TaskService }  from '../../../task/task.service';
import { MessagingService } from '../../../messaging/messaging.service';

@Component({
  selector: 'app-modal-dictionary',
  templateUrl: './modal-dictionary.component.html',
  styleUrls: ['./modal-dictionary.component.scss']
})
export class ModalDictionaryComponent implements OnInit {
  @Input()
    mode;
  @Input()
    task_id;
  private termsObj;

  constructor(
    private taskService: TaskService,
    private messagingService: MessagingService
  ) { }

  ngOnInit() {
  }

  updateTaskTerms(){
    //console.log('SEND TO TASK LINK: ', this.termsObj)

    this.taskService
      .linkTaskTerms(this.task_id, this.termsObj)
      .subscribe((data) => {
        this.taskService.emitTaskTermChange(true);
        this.messagingService.showMessage('success', 'Success!', `Dictionary term(s) updated successfully!`);
      });
  }

  selectedItems(event){
    this.termsObj = event;
  }

}
