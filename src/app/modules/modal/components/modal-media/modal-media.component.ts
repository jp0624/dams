import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from '../../../media/media.service';

@Component({
  selector: 'app-modal-media',
  templateUrl: './modal-media.component.html',
  styleUrls: ['./modal-media.component.scss']
})
export class ModalMediaComponent implements OnInit {
  @Input()
    mode;
  @Input()
    media;
  
  private filepath;
  constructor(
    private mediaService: MediaService
  ) { }

  ngOnInit() {
    //console.log('this.media.value: ', this.media);
    if(this.media.template_value) {
      this.media.value = this.media.template_value
      this.media.key = this.media.content_id
    }
    this.filepath = this.media.value || this.media.template_value
    if(!this.filepath){
      this.mode = 'folder'
    } else {
      this.getFileData();
    }
    // if(this.media.value){
    //   this.mode = 'file';
    // }

    //console.log('MEDIA DETAILS: ', this.media);
  }
  changeMode(event){
    this.mode = event;
    //console.log('CHANGE MODE: ', event);
  }
  getFileData(){

    this.filepath = this.filepath.replace(/\//g,':');
    this.filepath = this.filepath.replace(/(-?::s*)/g, ':');
    
      this.mediaService
        .getFileData(this.filepath)
        .subscribe((data) => {
          //console.error('DATA RESPONSE(file data): ', data);
          if(data){
            this.mode = 'file'
          }else {
            this.mode = 'folder'
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
