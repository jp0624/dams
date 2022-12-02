import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dictionary-detail-form',
  templateUrl: './dictionary-detail-form.component.html',
  styleUrls: ['./dictionary-detail-form.component.scss']
})
export class DictionaryDetailFormComponent implements OnInit {
  @Input()
    term: any;
  @Input()
    parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
