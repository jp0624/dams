import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../../../../../services/global.service';

@Component({
  selector: 'app-task-preview-image',
  templateUrl: './task-preview-image.component.html',
  styleUrls: ['./task-preview-image.component.css']
})
export class TaskPreviewImageComponent implements OnInit {
  @Input() ind: number;
  @Input() content: any;
  mouseover:boolean;
  
  constructor( private globalService: GlobalService ) {
    
   }

  ngOnInit() {
  }

}
