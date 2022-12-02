import { Component, OnInit, Inject } from '@angular/core';
import { DictionaryService } from '../../../../../dictionary/dictionary.service';
import { Subject } from 'rxjs/Subject';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dictionary-modal',
  templateUrl: './dictionary-modal.component.html',
  styleUrls: ['./dictionary-modal.component.css']
})

export class DictionaryModalComponent implements OnInit {
  public terms: Array<any>;
  public dtTrigger: Subject<any> = new Subject();
  public selectedObjects: any;

  constructor(private dicService: DictionaryService,
    public dialogRef: MatDialogRef<DictionaryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log(this.data['tid']);
    if (localStorage.getItem('terms-list')) {
      this.terms = JSON.parse(localStorage.getItem('terms-list'));
      this.dtTrigger.next();
    } else {
      this.dicService.getTerms()
        .subscribe(result => {
          console.log('Get all terms:');
          console.log(result);
          localStorage.setItem('terms-list', JSON.stringify(result));
          this.terms = result;
          this.dtTrigger.next();
      });
    }
  }

  onSave() {
    if (this.selectedObjects && this.selectedObjects.length != undefined && this.selectedObjects.length > 0) {
      this.selectedObjects.forEach(element => {
        this.data['terms'].push(element.term_id);
      });

      this.data.termsFullInfo = this.selectedObjects;
    }
    
    this.dialogRef.close(this.data);
  }
}
