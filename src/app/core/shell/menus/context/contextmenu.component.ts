import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '../../../../modules/dictionary/dictionary.service';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  private displayMenu;
  dictionary;
  
  constructor(
    private dictionaryService: DictionaryService
  ) { }

  ngOnInit() {
    this.getDictionary();
  }

	getDictionary() {
    this.dictionaryService
      .getTerms()
      .subscribe((data) => {
        this.dictionary = data;
        //console.log('DICTIONARY: ', this.dictionary); 
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      })
  }


}
