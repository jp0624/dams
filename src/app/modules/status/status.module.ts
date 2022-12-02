import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ElementsModule }  from '../../core/elements/elements.module';
import { ShellModule }  from '../../core/shell/shell.module';

// services
import { StatusService } from './status.service';

// containers
import { StatusDashboardComponent } from './containers/status-dashboard/status-dashboard.component';

// components
import { StatusDetailComponent } from './components/status-detail/status-detail.component';
import { StatusListComponent } from './components/status-list/status-list.component';
import { StatusHomeComponent } from './components/status-home/status-home.component';
import { StatusDetailFormComponent } from './components/status-detail/status-detail-form/status-detail-form.component';
import { DataTableModule } from 'primeng/datatable';

const statusRoutes: Routes = [
  {
      path: 'status',
      component: StatusDashboardComponent,
          children: [
            {
                path: '',
                component: StatusHomeComponent
            },
            {
                path: 'list',
                component: StatusListComponent
            },
            {
                path: ':id',
                component: StatusDetailComponent
            },
            {
                path: 'create',
                component: StatusDetailComponent
            }
      ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(statusRoutes),
    ReactiveFormsModule,
    ElementsModule,
    ShellModule,
    DataTableModule
  ],
  declarations: [
    StatusDashboardComponent,
    StatusDetailComponent,
    StatusListComponent,
    StatusHomeComponent,
    StatusDetailFormComponent
  ],
  providers: [
    //services
    StatusService
  ],
  exports: [
    RouterModule
  ]
})
export class StatusModule { }
