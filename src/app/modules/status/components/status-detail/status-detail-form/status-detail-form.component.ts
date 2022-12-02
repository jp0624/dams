import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-status-detail-form',
  templateUrl: './status-detail-form.component.html',
  styleUrls: ['./status-detail-form.component.scss']
})
export class StatusDetailFormComponent implements OnInit {
  @Input()
    status: any;
  @Input()
    parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
