import { Component, Input, OnInit } from '@angular/core';
import { CountryService }  from '../../../country/country.service';
import { ModalService }  from '../../modal.service';
import { MessagingService } from '../../../messaging/messaging.service';

@Component({
  selector: 'app-modal-language',
  templateUrl: './modal-language.component.html',
  styleUrls: ['./modal-language.component.scss']
})
export class ModalLanguageComponent implements OnInit {
  @Input()
    mode;
  @Input()
    country_code;
  private languagesObj;

  constructor(
    private countryService: CountryService,
    private modalService: ModalService,
    private messagingService: MessagingService
  ) { }

  ngOnInit() {
  }

  updateCountryLanguages(){
    //console.log('SEND TO TASK LINK: ', this.languagesObj)

    this.countryService
      .linkCountryLanguages(this.country_code, this.languagesObj)
      .subscribe((data) => {
        
        //console.log('GET COUNTRY LANGUAGE LINK RESPONSE: ', data);
        this.countryService.emitUpdatedCountryLanguages(true);
        this.messagingService.showMessage('success', 'Success!', `Languages updated successfully!`);
        //this.modalService.hideModal()
      });

  }
  selectedItems(event){
    //console.log('COUNTRY CODE: ', this.country_code);
    //console.log('SELETCED ITEMS EVENT <MODAL>: ', event)
    this.languagesObj = event;
  }

}
