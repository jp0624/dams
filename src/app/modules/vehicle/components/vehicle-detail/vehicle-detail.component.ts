import { Component, Inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { VehicleService } from '../../vehicle.service';
import { MessagingService } from '../../../messaging/messaging.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {
  vehicle;
  private formControls: any;
  private params: any = false;
  form = this.fb.group({
    vehicle: this.fb.group({
      code: '',
      vehicle_id: '',
      name: '',
      description: ''
    })
  })

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private messagingService: MessagingService,
    private fb: FormBuilder
  ) { }

  onSubmit() {
    if (this.form.valid) {
      if (this.vehicle.vehicle_id) {
        this.updateVehicle(this.form.value.vehicle);
      } else {
        //console.log('TRY TO CREATE WITH: ', this.form.value.vehicle)
        this.createVehicle(this.form.value.vehicle);
      }
    }
  }

  ngOnInit() {
    this.formControls = this.form.controls.vehicle.value;
    this.getVehicleId();
  }

  clearForm() {
    for (let value of Object.keys(this.formControls)) {
      this.form.controls.vehicle.get(value).setValue('');
    }
  }

  getVehicleId() {
    this.route.params.subscribe(params => {
      this.params = this.route.snapshot.paramMap.get('id');
      if (Number(this.params)) {
        //console.log('SETUP VEHICLE ENVIRONMENT: vehicle_id-', this.params)
        this.getVehicle(this.params);

      } else if (this.params === 'create') {
        this.clearForm();
        this.vehicle = true;
        //console.log(this.form.controls.vehicle.value)
        //console.log('SETUP CREATE VEHICLE ENVIRONMENT: ', this.params)
        this.params = false;
      } else {
        this.clearForm();
        //console.log('UNKNOWN VEHICLE REQUEST: ', this.params)
        this.params = false;
      }
    });
  }

  getVehicle(id) {
    this.vehicleService
      .getVehicle(id)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET LANGUAGE REQUEST: ', data);
        if (!Object.keys(data).length) { return }
        this.vehicle = data[0];

        for (let value of Object.keys(this.vehicle)) {
          if (value != ('last_update' || 'update_date')) {
            this.form.controls.vehicle.get(value).setValue(this.vehicle[value]);
          }
        }
      });
  }

  updateVehicle(event) {
    this.vehicleService
      .updateVehicle(event)
      .subscribe(
        (data) => {
          //console.log('RESPONSE FROM PUT VEHICLE REQUEST: ', data);
          //this.course = data;
          this.messagingService.showMessage('success', 'Vehicle Updated', `Vehicle has been updated successfully!`);
        },
        error => {
          console.log(error);
        },
        () => {
          //console.log('No error code');
          // No error, some logic
        });
  }

  createVehicle(event) {
    this.vehicleService
      .createVehicle(event)
      .subscribe(
        (data) => {
          //console.log('RESPONSE FROM POST VEHICLE REQUEST: ', data);
          this.clearForm();
          this.messagingService.showMessage('success', 'Vehicle Created', `Vehicle has been created successfully!`);
          //this.course = data;
        },
        error => {
          console.log(error);
        },
        () => {
          //console.log('No error code');
          // No error, some logic
        });
  }

}
