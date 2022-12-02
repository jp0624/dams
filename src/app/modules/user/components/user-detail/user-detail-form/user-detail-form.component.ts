import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styleUrls: ['./user-detail-form.component.scss']
})
export class UserDetailFormComponent implements OnInit {
  @Input()
    user: any;
  @Input()
    parent: FormGroup;
  @Input()
    groups: any;

  constructor() { }

  ngOnInit() {
    // this.parent.controls.user.get('group_id').setValue(0);
    // if (!this.parent.controls.user.get('group_id').value) {
    //   this.parent.controls.user.get('group_id').setValue(0);
    // }
    // alert(this.parent.controls.user.get('group_id').value);
    // if (this.user.group_id === undefined) {
    //   this.user.group_id = 0;
    // }
  }

}
