import { Component, Inject, Input, OnInit, OnChanges, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { LessonService } from '../../lesson.service';
@Component({
  selector: 'app-lesson-versions',
  templateUrl: './lesson-version.component.html',
  styleUrls: ['./lesson-version.component.scss']
})
export class LessonVersionComponent implements OnInit {
  @Input('id') id;
  lessonService: any;

	constructor(
    @Inject(LessonService) lessonService
  ) {
    this.lessonService = lessonService;
	}

  ngOnInit() {
    this.getLessonVersions()
    //console.log('VERSIONS', this.lessonService.lessonSelectedVersionsList);
  }
	getLessonVersions() {
    this.lessonService.getLessonVersions(this.id);
  }

}
