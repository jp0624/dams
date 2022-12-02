import { Component, OnInit } from '@angular/core';

import { CountryService } from '../../country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countries;

	constructor(
    private countryService: CountryService,
    private router: Router
  ) { 	}

  ngOnInit() {
    this.getCountries()
  }

	getCountries() {
    this.countryService
      .getCountries()
      .subscribe((data) => {
        this.countries = data;
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
    this.router.navigate([`/country/${event.data.country_id}`]);
  }
}
