import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-country-detail-form',
  templateUrl: './country-detail-form.component.html',
  styleUrls: ['./country-detail-form.component.scss']
})
export class CountryDetailFormComponent implements OnInit {
  @Input()
    country: any;
  @Input()
    parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
