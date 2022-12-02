import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ElementsModule }  from '../../core/elements/elements.module';
import { ShellModule }  from '../../core/shell/shell.module';

// services
import { TaskService } from './task.service';

// containers
import { TaskDashboardComponent } from './containers/task-dashboard/task-dashboard.component';

// components
import { TaskAttributeComponent } from './components/task-attribute/task-attribute.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AttributeGroupComponent } from './components/task-attribute/attribute-group/attribute-group.component';
import { AttributeTypeComponent } from './components/task-attribute/attribute-type/attribute-type.component';
import { TaskTypeComponent } from './components/task-type/task-type.component';
import { TaskHomeComponent } from './components/task-home/task-home.component';
import { TaskTermComponent } from './components/task-term/task-term.component';
import { TaskDetailFormComponent } from './components/task-detail/task-detail-form/task-detail-form.component';
import { TaskContentComponent } from './components/task-content/task-content.component';
import { AttributeListComponent } from './components/task-attribute/attribute-list/attribute-list.component';
import { TaskDetailVersionComponent } from './components/task-detail/task-detail-version/task-detail-version.component';
import { TaskTypeAttrGroupComponent } from './components/task-type-attr-group/task-type-attr-group.component';
import { TaskTypeManagementComponent } from './components/task-type-management/task-type-management.component';
import { TaskTypeListComponent } from './components/task-type-management/task-type-list-component.component';
import { TaskTypeAttrManagementComponent } from './components/task-type-attr-management/task-type-attr-management.component';
import { TaskTypeAttrListComponent } from './components/task-type-attr-management/task-type-attr-list-component.component';
import { TaskMgmtComponent } from './components/task-management/task-management.component';
import { MaterialModule } from '../../material/material.module';
import { DataTableModule } from 'primeng/datatable';
import { TaskContentContainerComponent } from './components/task-management/task-content-container/task-content-container.component';
import { TaskInfoComponent } from './components/task-management/task-info/task-info.component';
import { TaskContentItemComponent } from './components/task-management/task-content-item/task-content-item.component';
import { TaskDictionaryComponent } from './components/task-management/task-dictionary/task-dictionary.component';
import { DictionaryModalComponent } from './components/task-management/task-dictionary/dictionary-modal/dictionary-modal.component';
import { TaskGroupModalComponent } from './components/task-management/task-content-container/task-group-modal/task-group-modal.component';
import { TaskGroupInputsComponent } from './components/task-management/task-content-container/task-group-inputs/task-group-inputs.component';
import { TaskAttrInputsComponent } from './components/task-management/task-content-container/task-attr-inputs/task-attr-inputs.component';
import { TaskAttrInputsUpdateComponent } from './components/task-management/task-content-container/task-attr-inputs-update/task-attr-inputs-update.component';
import { TaskVersionsInputComponent } from './components/task-management/task-content-container/task-versions-input/task-versions-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskPreviewImageComponent } from './components/task-management/task-content-item/task-preview-image/task-preview-image.component';
const taskRoutes: Routes = [
  {
      path: 'task',
      component: TaskDashboardComponent,
          children: [
            {
                path: '',
                component: TaskHomeComponent
            },
            {
                path: 'list',
                component: TaskListComponent
            },
            {
                path: 'ver/:id',
                component: TaskDetailVersionComponent
            },
            {
                path: 'attr/list',
                component: AttributeListComponent
            },
            {
                path: 'attr/list/:type_id',
                component: AttributeListComponent
            },
            {
                path: 'attr/:link_id',
                component: AttributeTypeComponent
            },
            {
                path: ':id',
                component: TaskMgmtComponent
            },              
            {
                path: 'type/attrgroup/link',
                component:TaskTypeAttrGroupComponent
            },  
            {
              path: 'type/:id',
              component: TaskTypeManagementComponent
            },
            {
              path: 'type/view/list',
              component: TaskTypeListComponent
            },  
            {
              path: 'type/attr/:id',
              component: TaskTypeAttrManagementComponent
            },
            {
              path: 'type/attr/view/list',
              component: TaskTypeAttrListComponent
            }]
  }
]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(taskRoutes),
    ElementsModule,
    ShellModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTableModule,
    BrowserAnimationsModule
  ],
  declarations: [
    TaskDashboardComponent,
    TaskAttributeComponent,
    TaskDetailComponent,
    TaskListComponent,
    AttributeGroupComponent,
    AttributeTypeComponent,
    TaskTypeComponent,
    TaskHomeComponent,
    TaskTermComponent,
    TaskDetailFormComponent,
    TaskContentComponent,
    AttributeListComponent,
    TaskDetailVersionComponent,
    TaskTypeAttrGroupComponent,
    TaskTypeManagementComponent,
    TaskTypeListComponent,
    TaskTypeAttrManagementComponent,
    TaskTypeAttrListComponent,
    TaskMgmtComponent,
    TaskContentContainerComponent,
    TaskInfoComponent,
    TaskContentItemComponent,
    TaskDictionaryComponent,
    DictionaryModalComponent,
    TaskGroupModalComponent,
    TaskGroupInputsComponent,
    TaskAttrInputsComponent,
    TaskAttrInputsUpdateComponent,
    TaskVersionsInputComponent,
    TaskPreviewImageComponent
  ],
  providers: [
    //services
    TaskService
  ],
  exports: [
    RouterModule,
    TaskDashboardComponent,
    TaskAttributeComponent,
    TaskDetailComponent,
    TaskListComponent,
    TaskTermComponent,
    AttributeGroupComponent,
    AttributeTypeComponent,
    TaskTypeComponent,
    AttributeListComponent,
    TaskDetailVersionComponent,
    TaskTypeAttrGroupComponent,
    TaskTypeManagementComponent,
    TaskMgmtComponent,
    TaskContentContainerComponent,
    TaskInfoComponent,
    TaskContentItemComponent,
    TaskDictionaryComponent,
    DictionaryModalComponent,
    TaskGroupModalComponent,
    TaskGroupInputsComponent,
    TaskAttrInputsComponent,
    TaskAttrInputsUpdateComponent,
    TaskVersionsInputComponent,
    TaskPreviewImageComponent
  ],
  entryComponents: [
    TaskContentItemComponent,
    DictionaryModalComponent,
    TaskGroupModalComponent,
    TaskGroupInputsComponent,
    TaskAttrInputsComponent,
    TaskAttrInputsUpdateComponent,
    TaskVersionsInputComponent
  ]
})

export class TaskModule { }
