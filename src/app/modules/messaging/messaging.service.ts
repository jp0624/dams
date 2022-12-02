import { Injectable, Inject } from '@angular/core';
import { ModalService } from '../modal/modal.service';

@Injectable()
export class MessagingService {
  displayMessage: boolean;
  messageType: any;
  message: any;
  title: any;
  messageTimeout: any;

  constructor(
    private modalService: ModalService
  ) { }

  showMessage(type, title, message) {
    this.displayMessage = true;
    this.messageType = type;
    this.title = title;
    this.message = message;

    //console.log('SHOW MESSAGE: ', this.messageType);
    this.messageTimeout = setTimeout(() => {
      this.hideMessage();
    }, 3000);
  }

  hideMessage() {
    if (this.messageType = 'success') {
      this.modalService.hideModal();
    }
    this.displayMessage = false;
    this.messageType = false;
    this.title = '';
    this.message = '';

    //console.log('HIDE MESSAGE: ', this.messageType);
    clearTimeout(this.messageTimeout);
  }
}
