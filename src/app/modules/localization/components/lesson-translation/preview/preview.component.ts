import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, InjectionToken, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { VersionService } from '../../../../version/version.service';
import { FormControl } from '@angular/forms';
import { GlobalService } from '../../../../../services/global.service';
import { WindowRef } from '../../../../../services/window.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit {
  @ViewChild('btnClose') btnClose: ElementRef;

  versions: Array<any> = [];
  version = new FormControl();
  nativeWindow: any;

  constructor(private dialogRef: MatDialogRef<PreviewComponent>,
    private versionService: VersionService,
    private globalService: GlobalService,
    private snackbar: MatSnackBar,
    private winRef: WindowRef,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nativeWindow = winRef.getNativeWindow();
  }

  ngOnInit() {
    this.versionService.getVersions()
      .subscribe(resp => {
        this.versions = resp;
      });
  }

  ngAfterViewInit() {
    // document.getElementById('#btnClose').blur();
    this.btnClose.nativeElement.blur();
  }

  preview(versionCode: String) {
    if (this.data.lessoncode && this.data.countrycode && this.data.languagecode) {
      let concatenateUrl = '';
      if (this.data.vehiclecode)
        concatenateUrl += '&vehicle_type=' + this.data.vehiclecode;
      if (versionCode)
        concatenateUrl += '&version_code=' + versionCode;
      let url = this.globalService.lfa_fe + '/?preview=' + this.data.lessoncode + '&country_code=' + this.data.countrycode + '&language_code=' + this.data.languagecode + concatenateUrl;
      this.nativeWindow.open(url);
    } else {
      this.snackbar.open('Please press search button before previewing', 'Close', {
        duration: 3000,
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
