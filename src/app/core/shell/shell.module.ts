
import { BrowserModule }      from '@angular/platform-browser';
import { NgModule }   from '@angular/core';
import { CommonModule }       from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';
import { ElementsModule }  from '../elements/elements.module';
//shell
  import { QuestionService } from './forms/question/question.service';

  //tables
  import { DynamicTableComponent } from './tables/dynamic/dynamic.component';

  //lists
  import { DynamicListComponent } from './lists/dynamic/dynamic.component';

  import { ContextMenuComponent } from './menus/context/contextmenu.component';
  
  import { QuestionComponent } from './forms/question/question.component';
  import { NewFormComponent } from './forms/new-form/new-form/new-form.component';
  import { SubFormComponent } from './forms/new-form/sub-form/sub-form.component';
  import {MaterialModule} from '../../material/material.module';

@NgModule({
  declarations: [
    DynamicTableComponent,
    DynamicListComponent,
    NewFormComponent,
    SubFormComponent,
    QuestionComponent,
    ContextMenuComponent
  ],
  imports: [
    CommonModule,
    ElementsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    QuestionService
  ],
  exports: [
    DynamicTableComponent,
    DynamicListComponent,
    NewFormComponent,
    SubFormComponent,
    QuestionComponent,
    ContextMenuComponent
    
  ]
})
export class ShellModule {

}
