import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-language-detail-form',
  templateUrl: './language-detail-form.component.html',
  styleUrls: ['./language-detail-form.component.scss']
})
export class LanguageDetailFormComponent implements OnInit {
  @Input()
    language: any;
  @Input()
    parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
