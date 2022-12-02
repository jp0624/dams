import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingContainerComponent } from './containers/messaging-container/messaging-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MessagingContainerComponent
  ],
  exports: [
    MessagingContainerComponent
  ]
})
export class MessagingModule { }
