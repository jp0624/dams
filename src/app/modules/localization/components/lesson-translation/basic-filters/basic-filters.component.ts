import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LessonService } from '../../../../lesson/lesson.service';
import { CountryService } from '../../../../country/country.service';
import { LocalizationService } from '../../../localization.service';

@Component({
  selector: 'app-basic-filters',
  templateUrl: './basic-filters.component.html',
  styleUrls: ['./basic-filters.component.css']
})
export class BasicFiltersComponent implements OnInit {

  lessonControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  lessons: Array<any> = [];
  countries: Array<any> = [];
  languages: Array<any> = [];
  vehicles: Array<any> = [];
 // versions: Array<any> = [];
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter<any>();

  filteredOptions: Observable<string[]>;
  fgFilter: FormGroup = new FormGroup({});

  constructor(
    private lessonService: LessonService, 
    private countryService: CountryService,
    private LocalizationService: LocalizationService,
    private fb: FormBuilder
  ) {
    this.fgFilter = fb.group({
      lessoncode: new FormControl('', [Validators.required]),
      countrycode: new FormControl('', [Validators.required]),
      languagecode: new FormControl('', [Validators.required]),
      vehiclecode: new FormControl(''),
    //  versioncode: new FormControl('') 
    })
  }

  ngOnInit() {
    this.getLessons();
    this.countryService.getCountries().subscribe(resp => {
        this.countries = resp;
      },
      err => {
        console.log(err);
      },
      () => {
        
      });
  }

  private _filter(value: string): Array<any> {
    const filterValue = value.toLowerCase();

    return this.lessons.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  vehicleChange(lessoncode) {  
    this.vehicles = [];
   // this.versions = [];
      this.LocalizationService.getVehicleLocalization(lessoncode).subscribe(resp => {
        this.vehicles = resp;
      },
      err => {
        console.log(err);
      },
      () => {        
      });    
      // this.LocalizationService.getVersionLocalization(lessoncode).subscribe(resp => {
      //   this.versions = resp;
      // },
      // err => {
      //   console.log(err);
      // },
      // () => {
      //     });
}  
// get version according to vehicle type
// versionChange(vehiclecode) {
//   this.LocalizationService.getVehicleVersion(vehiclecode, this.fgFilter.controls['lessoncode'].value).subscribe(resp => {
//     this.versions = resp;
//   },
//   err => {
//     console.log(err);
//   },
//   () => {
//       });
// }
	getLessons() {
    this.lessonService
      .getAllDistinctLessons()
      .subscribe((data) => {
        this.lessons = data;
        this.filteredOptions = this.fgFilter.controls['lessoncode'].valueChanges
           .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });
  }

  countryChange(code) {
    // console.log(code);
    this.countryService.getCountryLanguages(code).subscribe(resp => {
      this.languages = resp;
      },
      err => {
        console.log(err);
      },() => {
        
      });
  }

  languageChange(code) {
    // console.log(code);
  }

  search(formvalue) {
    //console.log(formvalue);
    this.onFilterChange.emit(formvalue);
  }
}
