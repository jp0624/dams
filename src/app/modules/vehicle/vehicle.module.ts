import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ElementsModule }  from '../../core/elements/elements.module';
import { ShellModule }  from '../../core/shell/shell.module';
import { DataTableModule } from 'primeng/datatable';

// services
import { VehicleService } from './vehicle.service';

// containers
import { VehicleDashboardComponent } from './containers/vehicle-dashboard/vehicle-dashboard.component';

// components
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { VehicleHomeComponent } from './components/vehicle-home/vehicle-home.component';
import { VehicleDetailFormComponent } from './components/vehicle-detail/vehicle-detail-form/vehicle-detail-form.component';
import { MaterialModule } from '../../material/material.module';

const vehicleRoutes: Routes = [
  {
      path: 'vehicle',
      component: VehicleDashboardComponent,
          children: [
              {
                  path: '',
                  component: VehicleHomeComponent
              },
              {
                  path: 'list',
                  component: VehicleListComponent
              },
              {
                  path: ':id',
                  component: VehicleDetailComponent
              },
              {
                  path: 'create',
                  component: VehicleDetailComponent
              }
      ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(vehicleRoutes),
    ReactiveFormsModule,
    ElementsModule,
    ShellModule,
    DataTableModule,
    MaterialModule
  ],
  declarations: [VehicleDashboardComponent, VehicleListComponent, VehicleDetailComponent, VehicleHomeComponent, VehicleDetailFormComponent],

  providers: [
    //services
    VehicleService
  ],
  exports: [
    RouterModule
  ]
})
export class VehicleModule { }
