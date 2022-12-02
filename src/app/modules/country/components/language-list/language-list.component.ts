import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, DoCheck, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LanguageListComponent implements OnInit, AfterViewInit, DoCheck {
  @Input() 
  countryLanguages: Array<any>;
  
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cd.markForCheck();
  }

  ngDoCheck() {
    this.cd.markForCheck();
  }

}
