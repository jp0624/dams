import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ElementsModule } from '../../core/elements/elements.module';
import { TaskModule }     from '../task/task.module';
import { ShellModule }    from '../../core/shell/shell.module';

// services
import { LocalizationService } from './localization.service';

// containers
import { LocalDashboardComponent } from './containers/local-dashboard/local-dashboard.component';

// components
import { LocalDetailComponent } from './components/local-detail/local-detail.component';
import { LocalHomeComponent }   from './components/local-home/local-home.component';
import { LocalListComponent }   from './components/local-list/local-list.component';

// forms
import { FormCourseComponent }  from './components/local-forms/form-course/form-course.component';
import { FormTaskComponent }    from './components/local-forms/form-task/form-task.component';
import { FormLessonComponent }  from './components/local-forms/form-lesson/form-lesson.component';
import { FormLocalComponent }   from './components/local-forms/form-local/form-local.component';
import { FormFilterComponent } from './components/local-forms/form-filter/form-filter.component';
import { FormDataComponent } from './components/local-forms/form-data/form-data.component';
import { LessonTranslationComponent } from './components/lesson-translation/lesson-translation.component';
import { UploadLessonComponent } from './components/lesson-translation/upload-lesson/upload-lesson.component';
import { LessonContentComponent } from './components/lesson-translation/lesson-content/lesson-content.component';
import { BasicFiltersComponent } from './components/lesson-translation/basic-filters/basic-filters.component';

import { MaterialModule } from '../../material/material.module';
import { TaskContainerComponent } from './components/lesson-translation/lesson-content/task-container/task-container.component';
import { GroupContainerComponent } from './components/lesson-translation/lesson-content/task-container/group-container/group-container.component';
import { AttributeContainerComponent } from './components/lesson-translation/lesson-content/task-container/group-container/attribute-container/attribute-container.component';
import { DictionaryContainerComponent } from './components/lesson-translation/lesson-content/task-container/dictionary-container/dictionary-container.component';
import { GenerateExcelComponent } from './components/lesson-translation/generate-excel/generate-excel.component';
import { PreviewComponent } from './components/lesson-translation/preview/preview.component';

const localizationRoutes: Routes = [
  {
      path: 'localization',
      component: LocalDashboardComponent,
          children: [
              {
                  path: '',
                  component: LocalHomeComponent
              },
              {
                path: 'create',
                component: LocalDetailComponent
              },
              {
                  path: 'export',
                  component: GenerateExcelComponent
              },
              {
                  path: 'translation/lesson',
                  component: LessonTranslationComponent
              },
              {
                  path: ':type',
                  component: LocalDetailComponent
              },
              {
                  path: ':type/:id',
                  component: LocalDetailComponent
              },
              {
                  path: ':type/:id/:lang',
                  component: LocalDetailComponent
              },
              {
                  path: ':type/:id/:lang/:country',
                  component: LocalDetailComponent
              }
            ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(localizationRoutes),
    ElementsModule,
    ShellModule,
    TaskModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    //services
    LocalizationService
  ],
  declarations: [
    LocalDashboardComponent,
    LocalDetailComponent,
    LocalHomeComponent,
    LocalListComponent,
    FormCourseComponent,
    FormTaskComponent,
    FormLessonComponent,
    FormLocalComponent,
    FormFilterComponent,
    FormDataComponent,
    LessonTranslationComponent,
    UploadLessonComponent,
    LessonContentComponent,
    BasicFiltersComponent,
    TaskContainerComponent,
    GroupContainerComponent,
    AttributeContainerComponent,
    DictionaryContainerComponent,
    GenerateExcelComponent,
    PreviewComponent
  ],
  exports: [
    LocalDashboardComponent, 
    LocalDetailComponent, 
    LocalHomeComponent, 
    LocalListComponent,
    LessonTranslationComponent,
    UploadLessonComponent,
    LessonContentComponent,
    BasicFiltersComponent,
    TaskContainerComponent,
    GroupContainerComponent,
    AttributeContainerComponent,
    DictionaryContainerComponent,
    GenerateExcelComponent,
    PreviewComponent
  ],
  entryComponents: [ 
      GenerateExcelComponent,
      PreviewComponent 
  ]
})
export class LocalizationModule { }
