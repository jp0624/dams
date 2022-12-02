import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-group-detail-form',
  templateUrl: './group-detail-form.component.html',
  styleUrls: ['./group-detail-form.component.scss']
})
export class GroupDetailFormComponent implements OnInit {
  @Input()
    group: any;
  @Input()
    parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
