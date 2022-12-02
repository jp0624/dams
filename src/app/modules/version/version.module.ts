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
import { VersionService } from './version.service';

// components
import { VersionListComponent } from './version-list.component';
import { VersionManagementComponent } from './version-management.component';
import { MaterialModule } from '../../material/material.module';
import { VersionDashboardComponent } from './version-dashboard/version-dashboard.component';
import { VersionHomeComponent } from './version-home/version-home.component';

const versionRoutes: Routes = [
    { path: 'version', component: VersionDashboardComponent, 
        children: [
            { path: '', component: VersionHomeComponent },
            { path: 'list', component: VersionListComponent }
        ]
    }
]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(versionRoutes),
    ReactiveFormsModule,
    ElementsModule,
    ShellModule,
    DataTableModule,
    MaterialModule
  ],
  declarations: [ 
    VersionListComponent, VersionHomeComponent, VersionDashboardComponent, VersionManagementComponent
  ],
  providers: [
    //services
    VersionService
  ],
  bootstrap: [ VersionManagementComponent ],
  exports: [
    RouterModule
  ]
})
export class VersionModule { }
