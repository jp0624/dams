import { Component, Inject, OnInit, OnChanges, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { TranslationService } from '../../translation.service';
@Component({
  selector: 'app-translation-list',
  templateUrl: './translation-list.component.html',
  styleUrls: ['./translation-list.component.scss']
})
export class TranslationListComponent implements OnInit {
  translationService: any;

	constructor(
    @Inject(TranslationService) translationService
  ) {
    this.translationService = translationService;
	}

  ngOnInit() {
    this.getTranslations()
  }
	getTranslations() {
    this.translationService.getTranslations();
  }

}
