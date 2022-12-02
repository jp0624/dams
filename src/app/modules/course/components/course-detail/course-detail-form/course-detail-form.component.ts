import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormGroup, FormControl } from '@angular/forms';
import { CourseService } from '../../../course.service';
import { GlobalService }    from '../../../../../services/global.service';

@Component({
  selector: 'app-course-detail-form',
	providers: [
    CourseService
  ],
  templateUrl: './course-detail-form.component.html',
  styleUrls: ['./course-detail-form.component.scss']
})
export class CourseDetailFormComponent implements OnInit {
  @Input()
    course: any;
  @Input()
    parent: FormGroup;
  @Input()
    sts: any;

  constructor(
    private courseService: CourseService,
    private globalService: GlobalService
  ) {  }

  ngOnInit() {
  }


}
