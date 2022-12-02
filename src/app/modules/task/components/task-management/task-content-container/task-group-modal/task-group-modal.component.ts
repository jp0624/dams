import { Component, OnInit, Inject, ViewChild, TemplateRef, ComponentFactoryResolver, ViewContainerRef, ComponentRef, OnDestroy, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskAttrInputsComponent } from '../task-attr-inputs/task-attr-inputs.component';

@Component({
  selector: 'app-task-group-modal',
  templateUrl: './task-group-modal.component.html',
  styleUrls: ['./task-group-modal.component.css']
})
export class TaskGroupModalComponent implements OnInit, OnDestroy {
  taskid: number;
  @ViewChild('target', { read: ViewContainerRef }) vcRef: ViewContainerRef;
  componentRef: ComponentRef<any>;

  constructor(
    public dialogRef: MatDialogRef<TaskGroupModalComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data.group) {
      //Update task content
      const factory = this.resolver.resolveComponentFactory(this.data.component);
      this.componentRef = this.vcRef.createComponent(factory);
      this.componentRef.instance.group = this.data.group;
      this.componentRef.instance.taskContentUpdated.subscribe((data) => {
        // Console.log(data);
        // this.OnGroupSelect(data);
        this.dialogRef.close(data);
      });
    } 
    else if (this.data.attrid) {
      const factory = this.resolver.resolveComponentFactory(this.data.component);
      this.componentRef = this.vcRef.createComponent(factory);
      this.componentRef.instance.groupid = this.data.groupid;
      this.componentRef.instance.attrid = this.data.attrid;
      this.componentRef.instance.updateTaskContentGroup.subscribe((data) => {
        this.dialogRef.close(data);
      });
    } else {
      //Create task content
      const factory = this.resolver.resolveComponentFactory(this.data.component);
      this.componentRef = this.vcRef.createComponent(factory);
      this.componentRef.instance.tasktypeid = this.data.typeid;
      this.taskid = this.data.taskid;
      this.componentRef.instance.selectGroupId.subscribe((data) => {
        this.OnGroupSelect(data);
      });
    }
  }

  OnGroupSelect(data){
    this.vcRef.clear();

    const factory = this.resolver.resolveComponentFactory(TaskAttrInputsComponent);
    this.componentRef = this.vcRef.createComponent(factory);
    this.componentRef.instance.groupid = data['groupid'];
    this.componentRef.instance.linkid = data['linkid'];
    this.componentRef.instance.tagname = data['tagname'];
    this.componentRef.instance.icon = data['icon'];
    this.componentRef.instance.taskid = this.taskid;

    this.componentRef.instance.taskgroupcreated.subscribe((data) => {
      this.dialogRef.close(data);
    });
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
