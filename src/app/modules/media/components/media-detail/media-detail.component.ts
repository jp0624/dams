import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MediaService } from '../../media.service';
import { GlobalService } from '../../../../services/global.service';

import { ModalService } from '../../../modal/modal.service';
import { MessagingService } from '../../../messaging/messaging.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.component.html',
  styleUrls: ['./media-detail.component.scss']
})
export class MediaDetailComponent implements OnInit, OnDestroy {
@Input()
  file;
@Input()
  modal;
@Input()
  media;
@Output() mode = new EventEmitter();
  
private keys;
private filepath: string;

  constructor(
    private mediaService: MediaService,
    private globalService: GlobalService,
    private modalService: ModalService,
    private messagingService: MessagingService,
    private router: Router
  ) { }

  ngOnDestroy(){
    this.mediaService.fileData = '';
  }
  ngOnInit() {

    if(this.mediaService.fileData){
      this.filepath = this.mediaService.fileData;

    } else if(this.media){

      //console.log('MEDIA: ', this.media)
      this.filepath = this.media.value;
    }
    if(this.filepath){
      this.getFileData();
    }

  }
  viewFolder(folder){

    folder = folder.replace(/\//g,':');
    folder = folder.replace(/(-?::s*)/g, ':');
    this.mediaService.curPath = folder;

    if(this.modal){
      this.mode.emit(this.file.dir);
    } else if(!this.modal){
      this.router.navigate(['/media/']);
    }
    
  }
  selectFile(file){
    //console.log('FILE TO ADD: ', file);
    //console.log('INPUT ADD TO: ', this.media);

    let key = this.media.key ? this.media.key : this.media;
    
    this.mediaService.emitUpdatedTasks(file.path, key);
    // this.media.value(file.path);
    
    //this.messagingService.showMessage('success', 'Success!', `Selected updated successfully!`);
    this.modalService.hideModal()
  }
  getFileData(){

    this.filepath = this.filepath.replace(/\//g,':');
    this.filepath = this.filepath.replace(/(-?::s*)/g, ':');

    this.mediaService
      .getFileData(this.filepath)
      .subscribe((data) => {
        //console.error('DATA RESPONSE(file data): ', data);
        if(data){
          this.file = data;
          this.keys = Object.keys(this.file)
        }else {
          this.file.dir = '/media';
          this.viewFolder(true);
        }
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });
    
  }

}
