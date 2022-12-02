import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ElementsModule }  from '../../core/elements/elements.module';
import { TaskModule }  from '../task/task.module';
import { ShellModule }  from '../../core/shell/shell.module';

// services
import { LessonService } from './lesson.service';

// containers
import { LessonDashboardComponent } from './containers/lesson-dashboard/lesson-dashboard.component';

// components
import { LessonListComponent }        from './components/lesson-list/lesson-list.component';
import { LessonDetailComponent }      from './components/lesson-detail/lesson-detail.component';
import { LessonDetailFormComponent }  from './components/lesson-detail/lesson-detail-form/lesson-detail-form.component';
import { LessonHomeComponent }        from './components/lesson-home/lesson-home.component';
import { LessonVersionComponent }    from './components/lesson-version/lesson-version.component';
import { LessonTypeListComponent } from './components/lesson-type/lesson-type-list.component';
import { LessonTypeComponent } from './components/lesson-type/lesson-type.component';
import { MaterialModule } from '../../material/material.module';
import { DataTableModule } from 'primeng/datatable';
import { LessonSearchComponent } from './components/lesson-search/lesson-search.component';
import { CopyLessonFormComponent } from './components/lesson-detail/copy-lesson-form/copy-lesson-form.component';

const lessonRoutes: Routes = [
  {
      path: 'lesson',
      component: LessonDashboardComponent,
          children: [
              {
                  path: '',
                  component: LessonHomeComponent
              },
              
              {
                path: 'search',
                component: LessonSearchComponent
             },
              {
                  path: 'list',
                  component: LessonListComponent
              },
              {
                  path: ':id',
                  component: LessonDetailComponent
              },
              {
                  path: 'create',
                  component: LessonDetailComponent
              },
              {
                  path: 'type/list',
                  component: LessonTypeListComponent
              },
              {
                 path: 'type/:id',
                 component: LessonTypeComponent
              }
      ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(lessonRoutes),
    ElementsModule,
    ShellModule,
    TaskModule,
    ReactiveFormsModule,
    DataTableModule,
    MaterialModule,
    
  ],
  declarations: [
    LessonDashboardComponent,
    LessonDetailComponent,
    LessonDetailFormComponent,
    LessonListComponent,
    LessonVersionComponent,
    LessonHomeComponent,
    LessonTypeListComponent,
    LessonTypeComponent,
    LessonSearchComponent,
    CopyLessonFormComponent
  ],
  providers: [
    //services
    LessonService
  ],
  exports: [
    RouterModule,
    LessonDetailComponent,
    LessonListComponent,
    LessonTypeListComponent,
    LessonTypeComponent
  ],
  entryComponents: [ 
    CopyLessonFormComponent 
  ]
})
export class LessonModule { }
