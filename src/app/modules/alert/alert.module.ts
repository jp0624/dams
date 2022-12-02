import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ElementsModule }  from '../../core/elements/elements.module';
import { ShellModule }  from '../../core/shell/shell.module';

// services
import { AlertService } from './alert.service';

// containers
import { AlertDashboardComponent } from './containers/alert-dashboard/alert-dashboard.component';

// components
import { AlertListComponent } from './components/alert-list/alert-list.component';
import { AlertComponent } from './components/alert-detail/alert-detail.component';
import { AlertHomeComponent } from './components/alert-home/alert-home.component';

import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from '../../material/material.module';

const alertRoutes: Routes = [{
      path: 'alert',
      component: AlertDashboardComponent,
          children: [
              {
                  path: '',
                  component: AlertHomeComponent
              },
              {
                  path: 'list',
                  component: AlertListComponent
              },
              {
                  path: ':id',
                  component: AlertComponent
              },
              {
                  path: 'create',
                  component: AlertComponent
              }
          ]
}]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(alertRoutes),
    ReactiveFormsModule,
    ElementsModule,
    ShellModule,
    DataTablesModule,
    MaterialModule
  ],
  declarations: [ 
      AlertDashboardComponent, 
      AlertListComponent, 
      AlertComponent, 
      AlertHomeComponent
    ],
  providers: [AlertService],
  exports: [
    RouterModule
  ]
})

export class AlertModule { }
