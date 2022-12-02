import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ElementsModule }  from '../../core/elements/elements.module';
import { ShellModule }  from '../../core/shell/shell.module';

// services
import { TranslationService } from './translation.service';

// containers
import { TranslationDashboardComponent } from './containers/translation-dashboard/translation-dashboard.component';

// components
import { TranslationDetailComponent } from './components/translation-detail/translation-detail.component';
import { TranslationListComponent } from './components/translation-list/translation-list.component';

const translationRoutes: Routes = [
  {
      path: 'translation',
      component: TranslationDashboardComponent,
          children: [
              {
                  path: '',
                  component: TranslationListComponent
              },
              {
                  path: ':id',
                  component: TranslationDetailComponent
              },
              {
                  path: 'create',
                  component: TranslationDetailComponent
              }
      ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(translationRoutes),
    ElementsModule,
    ShellModule
  ],
  declarations: [TranslationDashboardComponent, TranslationDetailComponent, TranslationListComponent],

  providers: [
    //services
    TranslationService
  ],
  exports: [
    RouterModule
  ]
})
export class TranslationModule { }
