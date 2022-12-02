import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../../../task.service';

@Component({
  selector: 'app-task-group-inputs',
  templateUrl: './task-group-inputs.component.html',
  styleUrls: ['./task-group-inputs.component.css']
})
export class TaskGroupInputsComponent implements OnInit {
  typegroups: Array<any>;
  @Input() tasktypeid: number;
  @Output() selectGroupId = new EventEmitter<any>();

  ngOnInit() {
    this.taskService.getAllTaskTypeGroupsByType(this.tasktypeid)
      .subscribe((data) => {
        this.typegroups = data;
      });
  }
 
  constructor(private taskService: TaskService) { }

  selectGroup(groupid, linkid, tagname, icon) {
    this.selectGroupId.emit({ groupid: groupid, linkid: linkid, tagname: tagname, icon: icon });
  }

}
