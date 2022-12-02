import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MediaService } from '../../media.service';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

import { Router } from '@angular/router';

import { GlobalService }    from '../../../../services/global.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {
  @Input()
    modal;
  @Output() mode = new EventEmitter();

  fileList = {
    files: [],
    folders: []
  };

  createFolder = false;
  uploadFile = false;
  constructor(
    public mediaService: MediaService
    ,private globalService: GlobalService
    ,private router: Router
    ,private http: HttpClient
  ) { }

  ngOnInit() {
    //console.log('media dashboard loaded: ', this.mediaService.curPath);

    this.mediaService.curPath = this.mediaService.curPath.replace(/\//g,':');
    this.mediaService.curPath = this.mediaService.curPath + ':';
    this.mediaService.curPath = this.mediaService.curPath.replace(/(-?::s*)/g, ':');

    this.mediaService.getFiles(this.mediaService.curPath)
      .subscribe(
        (data) => {
        this.fileList = data;
        //console.log('fileList: ', this.fileList)
        this.mediaService.curPath = this.mediaService.curPath.replace(/:/g,'/');
        },
        (err) => {
          console.log('ERROR');
        }
      );
  }
  viewFile(file){

    this.mediaService.fileData = file.path;

    if(this.modal){
      this.mode.emit(file);
    } else if(!this.modal){
      this.router.navigate(['/media/file']);
    }
    
  }
  upload(file){
    //console.log('file: ', file.files)

    // let uploadData = {
    //   file: file.files, //.replace(/\|/g,':'),
    //   path: this.curPath.replace(/\//g,':')
    // }

    let formData = new FormData();
    
    //file.files.item(0).curPath = this.mediaService.curPath;
    formData.append('curPath', this.mediaService.curPath);
    formData.append('photo', file.files.item(0));

    //console.log('file.files.item(0): ', file.files.item(0))
    //console.log('formData: ', formData)

    this.mediaService.curPath = this.mediaService.curPath.replace(/\//g,':');
    this.mediaService.curPath = this.mediaService.curPath + ':';
    this.mediaService.curPath = this.mediaService.curPath.replace(/(-?::s*)/g, ':');

    this.http
      .post(`${this.globalService.apiurl}/media/upload/${this.mediaService.curPath}`, formData)
      .subscribe(
        (data) => {
          this.getFolderData(this.mediaService.curPath);
        },
        (err) => {
          //console.log(err);
        } 
      )


    // //console.log('uploadData: ', uploadData)

    // this.mediaService.postFile(uploadData)
    //   .subscribe((data) => {
    //     //console.log('RESPONSE: ', data)
    //   });
  }
  createDir(dir){
    let dirData = {
      newDir: dir.replace(/\//g,':'),
      curDir: this.mediaService.curPath.replace(/\//g,':')
    }

    this.mediaService.createDir(dirData)
      .subscribe(
        (data) => {
         //console.log('mkdir response: ', data)
          this.getFolderData(this.mediaService.curPath)
          this.createFolder = false;
        },
        (err) => {
          console.log('mkdir error: ', err)
        }
      );

  }
  toggleCreateFolder() {
    this.createFolder = !this.createFolder;
  }
  toggleUploadFile() {
    this.uploadFile = !this.uploadFile;
  }
  getParentFolderData(path) {

    path = path.replace(/\:$/, '');
    let pathSplit = path.split('/');

    if(pathSplit[pathSplit.length - 1] === ''){
      pathSplit.splice(-1,1)
    }
    path = pathSplit.splice(-1,1)

    path = pathSplit.toString().replace(/,/g,':')
    this.mediaService.curPath = path + ':';

    this.getFolderData(path);

  }
  getFolderData(newPath){

    this.fileList.files = [];
    this.fileList.folders = [];

    newPath = newPath + '/';

    this.mediaService.curPath = newPath.replace(/\//g,':')

    //console.log('this.curPath: ', this.mediaService.curPath)

    this.mediaService.getFiles(this.mediaService.curPath)
      .subscribe(
        (data) => {
          this.fileList = data;
          //console.log('fileList: ', this.fileList)
          this.mediaService.curPath = this.mediaService.curPath.replace(/:/g,'/');
        },
        (err) =>{
          console.log('error: ', err)
        }
      );
      this.mediaService.curPath = this.mediaService.curPath.replace(/\:\:$/, ':');
      this.mediaService.curPath = this.mediaService.curPath.replace(/:/g,'/');
    
  }

}
