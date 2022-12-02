import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { LessonService } from '../../../lesson/lesson.service';
import { CountryService } from '../../../country/country.service' 
import { LanguageService } from '../../../language/language.service';
import { CourseService } from '../../../course/course.service';
import { VehicleService } from '../../../vehicle/vehicle.service';
import { StatusService } from '../../../status/status.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lesson-search',
  templateUrl: './lesson-search.component.html',
  styleUrls: ['./lesson-search.component.scss'],
  animations: [
    trigger('taskContentAnimation', [
      state('in', style({ opacity: 1, transform: 'translateX(0)'})),
      transition('void=>*', [
        style({ opacity: 0}),
        animate('0.4s ease-in')
      ]),
      transition('*=>void', [
        animate('0.8s ease-in',
        style({  opacity: 0}))
      ])
    ])
  ]
})
export class LessonSearchComponent implements OnInit {

  countries: Array<any> = [];
  lessons: Array<any> = [];
  languages: Array<any> = [];
  courses: Array<any> = [];
  vehicles: Array<any> = [];
  status: Array<any> = [];
  lessonslist: Array<any> = [];
  isProcessingSearchResult: boolean = false;
  numberOfRecords:number;
  fgFilter: FormGroup = new FormGroup({});

  constructor(
    private lessonService: LessonService, 
    private countryService: CountryService,
    private languageService: LanguageService,
    private courseService: CourseService,
    private vehicleService: VehicleService,
    private statusService: StatusService,
    private fb: FormBuilder
  ) {
    this.fgFilter = fb.group({
      lessoncode: new FormControl(),
      countrycode: new FormControl(),
      languagecode: new FormControl(),
      statuscode: new FormControl(),
      vehiclecode: new FormControl(),
      coursecode:new FormControl(),
    })
  
   }

  ngOnInit() {
    //lesson select box
    this.lessonService
    .getLessons()
    .subscribe((data) => {
        this.lessons = data;     
      },
      error => {
                console.log(error);
              },
      () => { 
        // No error, some logic
      });

      //country select box
    this.countryService.getCountries().subscribe(resp => {
        this.countries = resp;
      },
      err => {
        console.log(err);
      },
      () => {
        
      });

    //language select box
    this.languageService.getLanguages().subscribe(data =>{
      this.languages = data;
    },
    err =>{
      console.log(err);
    },
    () => {

    });

    //courses Select box
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    },
    err => {
      console.log(err);
    },
    () => {

    });

    //vehicles Select box
    this.vehicleService.getVehicles().subscribe(data => {
      this.vehicles = data;
    },
    err => {
      console.log(err);
    },
    () => {

    });

    //service select box

  this.statusService.getStatuses().subscribe(data => {
    this.status = data;
  },
  err => {
    console.log(err);
  },
  () => {

  });
}

//search button function for click
search(formvalue) {
   console.log(formvalue);
   console.log(this.numberOfRecords);
   this.isProcessingSearchResult = true;
   this.lessonService.createSearch(formvalue)
    .subscribe((data) => {
      this.isProcessingSearchResult = false;
      this.lessonslist = data;     
      console.log(this.lessonslist);
      this.numberOfRecords = this.lessonslist.length;
      console.log(this.numberOfRecords);
    },
    error => {
      this.isProcessingSearchResult = false;
              console.log(error);
            },
    () => { 
        // No error, some logic
    });
}

}