import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Subscription } from "rxjs/Rx";

import { LanguageService } from '../../language.service';
import { CountryService } from '../../../country/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-list',
	providers: [
    LanguageService
  ],
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss']
})
export class LanguageListComponent implements OnInit {
  languages;
  @Input()
    selectable: boolean;
  @Input()
    destination: any;
  @Input()
    modal: any;
  @Input()
    country_code;  
  @Output()
    itemsSelected = new EventEmitter<any>(); 
  
  private selected = [];
  private countryLanguages;
  private languageList;

  constructor(
    private languageService: LanguageService,
    private countryService: CountryService,
    private router: Router
  ) {  }
  
  ngOnInit() {
    this.getLanguages();
    if(this.country_code){
      this.getCountryLanguages(this.country_code)
    }
  }
  selectedItems(event){
    //console.log('SELETCED ITEMS EVENT <MODAL>: ', event)
    let langCodes = []

    for(let idx in event){
      ////console.error('LANGUAGE ID: ', event[idx])
      let obj = this.languages.find((obj) => { 
        return obj.language_id === event[idx]; 
      });
      langCodes.push(obj.code);
      //console.error('LANGUAGE OBJ: ', obj)
    }
    let countryLanguesList = {
      'cur' : this.countryLanguages,
      'new' : langCodes
    }
    //console.log('countryLanguesList: ', countryLanguesList);
    this.itemsSelected.emit(countryLanguesList);
  }

	getCountryLanguages(country_id) {
    this.countryService
      .getCountryLanguages(country_id)
      .subscribe((data) => {
        for (let lang of data) {
          this.selected.push(lang.id);
        }
        this.countryLanguages = data;
        //console.log('COUNTRY LANGUAGES: ', data)
        //this.languages = data;
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      })
  }

	getLanguages() {
    this.languageService
      .getLanguages()
      .subscribe((data) => {
        this.languages = data;
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      })
  }

  onRowSelect(event) {
    if (this.destination == 'modal') {
      this.selectedItems(event.data);
      // code id name
    }
    else {
      this.router.navigate([`/language/${event.data.language_id}`]);
    }
  }

}
