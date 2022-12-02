import { Component, Inject, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder } from '@angular/forms';

import { GlobalService }    from '../../../../services/global.service';
import { CountryService } from '../../country.service';
import { ModalService } from '../../../modal/modal.service';
import { MessagingService } from '../../../messaging/messaging.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  country;
  countryLanguages: Array<any>;
  
  private formControls: any;
  private params: any = false;
  props;

  private subscription;
  private countryLanguageUpdate;
  
  form = this.fb.group({
    country: this.fb.group({
      country_id: '',
      name: '',
      code: '',
      continent: ''
    })
  })

  constructor(
    private globalService: GlobalService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private messagingService: MessagingService,
    private fb: FormBuilder,
    private router: Router
  ) {  }
  
  onSubmit(){
    if (this.form.valid) {
      
      if(this.country.country_id) {
        this.updateCountry(this.form.value);
      } else {
        alert('create')
        ////console.log('TRY TO CREATE WITH: ', this.form.value)
        this.createCountry(this.form.value);
      }
    }
    else {
      alert('Invalid')
    }
  }

  ngOnInit() {
    this.formControls = this.form.controls.country.value;
    this.getCountryId();
    
    this.subscription = this.countryService.countryLanguagesChange
      .subscribe(event => {
        if(this.countryLanguageUpdate === event){
          return
        }
        this.countryLanguageUpdate = event

        if(this.countryLanguageUpdate){
          if (this.form.controls.country.get('code').value) {
            this.getCountryLanguages(this.form.controls.country.get('code').value);
          }
        }
        this.countryLanguageUpdate = false;
      });

      this.route.params.subscribe(params => {
        this.getCountryAndProp();
      });
  }

  clearForm(){
    for (let value of Object.keys(this.formControls)) {
        this.form.controls.country.get(value).setValue('');
    }
  }
  
  getCountryAndProp() {
    this.params = this.route.snapshot.paramMap.get('id');
    if( Number(this.params) ){
      //console.log('SETUP COUNTRY ENVIRONMENT: country_id-', this.params)
      this.getCountry(this.params);

    } else if(this.params === 'create') {
      this.clearForm();
      this.country = true;
      //console.log(this.form.controls.country.value)
      //console.log('SETUP CREATE COUNTRY ENVIRONMENT: ', this.params)
      this.params = false;

    } else {
      this.clearForm();
      //console.log('UNKNOWN COUNTRY REQUEST: ', this.params)
      this.params = false;

    }
  }

  getCountryId(){
    this.route.params.subscribe(params => {
      this.getCountryAndProp();
    //   this.params = this.route.snapshot.paramMap.get('id');
    //   if( Number(this.params) ){
    //     //console.log('SETUP COUNTRY ENVIRONMENT: country_id-', this.params)
    //     this.getCountry(this.params);

    //   } else if(this.params === 'create') {
    //     this.clearForm();
    //     this.country = true;
    //     //console.log(this.form.controls.country.value)
    //     //console.log('SETUP CREATE COUNTRY ENVIRONMENT: ', this.params)
    //     this.params = false;

    //   } else {
    //     this.clearForm();
    //     //console.log('UNKNOWN COUNTRY REQUEST: ', this.params)
    //     this.params = false;

    //   }
    });
  }

	getCountry(id) {
    this.countryService
      .getCountry(id)
      .subscribe(
        (data) => {
        
          this.getProps();
          
          //console.log('RESPONSE FROM GET COUNTRY REQUEST: ', data);
          if(!Object.keys(data).length){return}
          this.country = data[0];

          for (let value of Object.keys(this.country)) {
            if( value != ('last_update') ) {
              this.form.controls.country.get(value).setValue(this.country[value]);
            }
          }
          this.getCountryLanguages(this.country.code);
        },
        error => {
                  console.log(error);
                },
        () => { 
            //console.log('No error code');
            // No error, some logic
        });
  }

	getCountryLanguages(code) {
    this.countryService
      .getCountryLanguages(code)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET COUNTRY Languages REQUEST: ', data);
          this.countryLanguages = data;
          //console.log(this.countryLanguages);
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });
  }

  updateCountry(event){
    this.countryService
      .updateCountry(event)
      .subscribe(
        (data) => {
          //console.log('RESPONSE FROM PUT COUNTRY REQUEST: ', data);
          this.messagingService.showMessage('success', 'Country Updated', `Country has been updated successfully!`); 
        },
        error => {
          console.log(error);
        },
        () => { 
          //console.log('No error code');
          // No error, some logic
        });
  }

  createCountry(event){
    this.countryService
      .createCountry(event)
      .subscribe(
        (data) => {
          //console.log('RESPONSE FROM POST COUNTRY REQUEST: ', data);
          // data.insertId
          this.router.navigate([ `/country/${data.insertId}`]);
          //this.course = data;
          this.messagingService.showMessage('success', 'Country Created', `Country has been created successfully!`); 
        },
        error => {
          console.log(error);
        },
        () => { 
          //console.log('No error code');
          // No error, some logic
        }
    );
  }
  
  addProperty(id){
    this.props[id].status = true;
    //console.log('VERS: ', this.props)

    let version = {
      country_id: this.country.country_id,
      property_id: this.props[id].property_id
    };

    this.countryService
      .putCountryProperty(version)
      .subscribe(
        (data) => {
          //console.error('RESPONSE DATA: ', data)
        },
        error => {
                  console.log(error);
                },
        () => { 
            //console.log('No error code');
            // No error, some logic
        });
  }

  removeProperty(id){
    this.props[id].status = false;
    //console.log('VERS: ', this.props)

    let version = {
      country_id: this.country.country_id,
      property_id: this.props[id].property_id
    }
    
    this.countryService
      .removeCountryProperty(version)
      .subscribe(
        (data) => {
          //console.error('RESPONSE DATA: ', data)
        },
        error => {
                  console.log(error);
                },
        () => { 
            //console.log('No error code');
            // No error, some logic
        })
  }
  
  checkStatus(props) {
    //console.log('vers: ', props)
    for(let i in props){

      let checkLink = {
        country_id: this.country.country_id,
        property_id: props[i].property_id
      }

      this.countryService
        .getCountryPropStatus(checkLink)
        .subscribe((data) => {
          //console.log('STATUS DATA: ', data)
          if(data.length > 0){
            this.props[i].status = true;
          } else {
            this.props[i].status = false;
          }
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

  getProps() {
    this.globalService
      .getContentProperties()
      .subscribe((data) => {
        this.props = data;
        this.checkStatus(this.props);
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
