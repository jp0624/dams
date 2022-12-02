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
import { DictionaryService } from './dictionary.service';

// containers
import { DictionaryDashboardComponent } from './containers/dictionary-dashboard/dictionary-dashboard.component';

// components
import { DictionaryDetailComponent } from './components/dictionary-detail/dictionary-detail.component';
import { DictionaryListComponent } from './components/dictionary-list/dictionary-list.component';
import { DictionaryHomeComponent } from './components/dictionary-home/dictionary-home.component';
import { DictionaryDetailFormComponent } from './components/dictionary-detail/dictionary-detail-form/dictionary-detail-form.component';
import { DictionaryMultiselectListComponent } from './components/dictionary-multiselect-list/dictionary-multiselect-list.component';
const dictionaryRoutes: Routes = [
  {
      path: 'dictionary',
      component: DictionaryDashboardComponent,
          children: [
              {
                  path: '',
                  component: DictionaryHomeComponent
              },
              {
                  path: 'list',
                  component: DictionaryListComponent
              },
              {
                  path: ':id',
                  component: DictionaryDetailComponent
              },
              {
                  path: 'create',
                  component: DictionaryDetailComponent
              }
      ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(dictionaryRoutes),
    ReactiveFormsModule,
    ElementsModule,
    ShellModule,
    DataTableModule
  ],
  declarations: [
    DictionaryDashboardComponent,
    DictionaryDetailComponent,
    DictionaryListComponent,
    DictionaryHomeComponent,
    DictionaryDetailFormComponent,
    DictionaryMultiselectListComponent
  ],
  providers: [
    //services
    DictionaryService
  ],
  exports: [
    DictionaryListComponent,
    DictionaryMultiselectListComponent,
    RouterModule
  ]
})
export class DictionaryModule { }
