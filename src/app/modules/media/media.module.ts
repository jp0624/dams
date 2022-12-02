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
import { MediaService } from './media.service';

// containers
import { MediaDashboardComponent } from './containers/media-dashboard/media-dashboard.component';

// components
import { MediaListComponent } from './components/media-list/media-list.component';
import { MediaDetailComponent } from './components/media-detail/media-detail.component';
import { MediaHomeComponent } from './components/media-home/media-home.component';
import { MediaUploadComponent } from './components/media-upload/media-upload.component';

const mediaRoutes: Routes = [
  {
      path: 'media',
      component: MediaDashboardComponent,
          children: [
              {
                  path: '',
                  component: MediaListComponent //MediaHomeComponent
              },
              {
                  path: 'list',
                  component: MediaListComponent
              },
              {
                  path: 'file',
                  component: MediaDetailComponent
              },
              {
                  path: ':id',
                  component: MediaDetailComponent
              },
              {
                  path: 'create',
                  component: MediaDetailComponent
              }
      ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ElementsModule,
    ShellModule,
    TaskModule,
    CommonModule,
    RouterModule.forChild(mediaRoutes),
    ReactiveFormsModule
  ],
  declarations: [
    MediaDashboardComponent,
    MediaListComponent,
    MediaDetailComponent,
    MediaHomeComponent,
    MediaUploadComponent
  ],
  providers: [
    //services
    MediaService
  ],
  exports: [
    RouterModule,
    MediaDetailComponent,
    MediaListComponent
  ]
})
export class MediaModule { }
