import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Subscription } from "rxjs/Rx";

import { LanguageService } from '../../language.service';
import { CountryService } from '../../../country/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-multiselect-list',
	providers: [
    LanguageService
  ],
  templateUrl: './language-multiselect-list.component.html',
  styleUrls: ['./language-multiselect-list.component.scss']
})
export class LanguageMultiselectListComponent implements OnInit {
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
  
  oldItems: Array<any> = [];
  private countryLanguages;
  private languageList;
  public selectedLanguages: Array<any> = [];
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
    let addList = [];
    let delList = [];
    this.selectedLanguages.forEach((lang, index) => {
      let obj = this.oldItems.find((obj) => { 
        return obj["language_id"] == lang["language_id"]; 
      });

      if (obj === undefined) {
        addList.push(lang["code"]);
      }

      //console.error('addList OBJ: ', addList)
    });

    this.oldItems.forEach((lang, index) => {
      let obj = this.selectedLanguages.find((obj) => { 
        return obj["language_id"] == lang["language_id"];
      });

      if (obj == null) {
        delList.push(lang["code"]);
      }

      //console.error('delList : ', delList)
    });

    let countryLanguesList = {
      'add' : addList,
      'delete' : delList
    }

    //console.log('countryLanguesList :' + countryLanguesList);

    this.itemsSelected.emit(countryLanguesList);
  } 

	getCountryLanguages(country_id) {
    this.countryService
      .getCountryLanguages(country_id)
      .subscribe((data) => {
        for (let lang of data) {
          this.oldItems.push(lang);
          this.selectedLanguages.push(lang);
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
      //this.selectedItems(event.data);
      //this.selectedLanguages.push(event.data);
      //code id name
    }
    else {
      this.router.navigate([`/language/${event.data.language_id}`]);
    }
  }

}
