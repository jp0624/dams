import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ElementsModule }  from '../../core/elements/elements.module';
import { ShellModule }  from '../../core/shell/shell.module';

import { LanguageModule }  from '../language/language.module';
import { LessonModule }  from '../lesson/lesson.module';
import { TaskModule }  from '../task/task.module';
import { MediaModule }  from '../media/media.module';
import { DictionaryModule }  from '../dictionary/dictionary.module';

//directives
import { ClickStopPropagation }   from '../../directives/propogation.directive';

// services

// containers
import { ModalContainerComponent } from './containers/modal-container/modal-container.component';
import { ModalLessonComponent } from './components/modal-lesson/modal-lesson.component';
import { ModalDictionaryComponent } from './components/modal-dictionary/modal-dictionary.component';
import { ModalTaskComponent } from './components/modal-task/modal-task.component';
import { ModalTaskContentComponent } from './components/modal-task-content/modal-task-content.component';
import { ModalLanguageComponent } from './components/modal-language/modal-language.component';
import { ModalTaskAttrVersionComponent } from './components/modal-task-attr-version/modal-task-attr-version.component';
import { ModalMediaComponent } from './components/modal-media/modal-media.component';

// components

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ElementsModule,
    ShellModule,
    LessonModule,
    TaskModule,
    LanguageModule,
    MediaModule,
    DictionaryModule
  ],
  declarations: [
    ModalContainerComponent,
    ClickStopPropagation,
    ModalLessonComponent,
    ModalTaskComponent,
    ModalTaskContentComponent,
    ModalLanguageComponent,
    ModalTaskAttrVersionComponent,
    ModalMediaComponent,
    ModalDictionaryComponent
  ],
  providers: [
    //services
  ],
  exports: [
    ModalContainerComponent
  ]
})

export class ModalModule { }
