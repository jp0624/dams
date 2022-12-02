import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-vehicle-detail-form',
  templateUrl: './vehicle-detail-form.component.html',
  styleUrls: ['./vehicle-detail-form.component.scss']
})
export class VehicleDetailFormComponent implements OnInit {
  @Input()
    vehicle: any;
  @Input()
    parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
