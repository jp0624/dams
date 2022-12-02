import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-term',
  templateUrl: './task-term.component.html',
  styleUrls: ['./task-term.component.scss']
})
export class TaskTermComponent implements OnInit {
  @Input()
    terms;
  constructor() { }

  ngOnInit() {
  }

}
