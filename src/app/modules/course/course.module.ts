import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ElementsModule }  from '../../core/elements/elements.module';
import { ShellModule }  from '../../core/shell/shell.module';

// services
import { CourseService } from './course.service';

// containers
import { CourseDashboardComponent } from './containers/course-dashboard/course-dashboard.component';

// components
import { CourseListComponent }        from './components/course-list/course-list.component';
import { CourseDetailComponent }      from './components/course-detail/course-detail.component';
import { CourseDetailFormComponent }  from './components/course-detail/course-detail-form/course-detail-form.component';
import { CourseHomeComponent }        from './components/course-home/course-home.component';
import { DataTableModule } from 'primeng/datatable';
import { MaterialModule } from '../../material/material.module';

const courseRoutes: Routes = [
  {
      path: 'course',
      component: CourseDashboardComponent,
          children: [
            {
                path: '',
                component: CourseHomeComponent
            },
            {
                path: 'list',
                component: CourseListComponent
            },
            {
                path: ':id',
                component: CourseDetailComponent
            },
            {
                path: 'create',
                component: CourseDetailComponent
            }
      ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(courseRoutes),
    ElementsModule,
    ShellModule,
    ReactiveFormsModule,
    DataTableModule,
    MaterialModule
  ],
  declarations: [CourseDashboardComponent, CourseListComponent, CourseDetailComponent, CourseDetailFormComponent, CourseHomeComponent],
  
  providers: [
    //services
    CourseService
  ],
  exports: [
    RouterModule
  ]
})

export class CourseModule { }
