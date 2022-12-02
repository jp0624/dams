import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { LocalizationService } from '../../../localization.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-content.component.scss'],
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

export class LessonContentComponent implements OnInit, OnChanges {
  @Input() lessoncode: string = '';
  @Input() countrycode: string = '';
  @Input() languagecode: string = '';
  @Input() versioncode: string = '';
  @Input() vehiclecode: string = '';
  @Input() exceldata: Array<any> = [];
  content: Array<any> = [];
  myform: FormGroup;
  toggle: boolean = true;
  show: boolean = false;
  isApplied: boolean = true;
  saveInProgress: boolean = false;

  constructor( private localizationService: LocalizationService, 
               private fb: FormBuilder,
               private snackbar: MatSnackBar  ) { }

  ngOnInit() {
    // console.log(this.lessoncode);

    let btnApply = document.getElementById('btnApply');
    let clicks = Observable.fromEvent(btnApply, 'click');

    clicks.subscribe(click => { 
      // console.log('Apply button clicked');
      this.isApplied = false;
      this.show = true;
    })
  }

  UpdateChanges(formvalue) {
    this.saveInProgress = true;

    // console.log(formvalue);

    let data = this.processData(formvalue);

    if (data && ((data.newlist || data.updatelist) && data.newlist.length>0 || data.updatelist.length>0 || data.newdictionarylist.length>0 || data.updatedictionarylist.length>0)) {
      this.localizationService.updateContent(data)
      .subscribe(
        resp => {
          // console.log(resp);
          this.snackbar.open('Updated successfully.', 'Close', { duration: 4000 });
        },
        err => {
          console.error(err);
          this.snackbar.open('Failed to update: ' + err, 'Close', { duration: 4000 });
        },
        () => {
          this.saveInProgress = false;
        });
    }
    else {
      this.saveInProgress = false;
      this.snackbar.open('No changes found to update.', 'Close', { duration: 4000 });
    }
  }

  processData(formvalue) : any {
    let newList: Array<any> =[];
    let updateList: Array<any> =[];
    let newDictList: Array<any> = [];
    let updateDictList: Array<any> = [];
    formvalue.tasks.forEach(task => {
      task.groups.forEach(group => {
        group.attributes.forEach(attribute => {
          //If altered and new then  store in new list
          if (attribute.altered) {
            if (attribute.translation_id) {
              updateList.push({ translation_id: attribute.translation_id, translationvalue: attribute.translationvalue, contentid: attribute.contentid });
            } else if ( attribute.isnew && attribute.translationvalue!='' ) {
              newList.push({ translation_id: null, translationvalue: attribute.translationvalue, contentid: attribute.contentid });
            }
          }
        });
      });
      task.dictionary.forEach(dictionary => {
        if (dictionary.altered) {
          if (dictionary.translation_id) {
            updateDictList.push({ translation_id: dictionary.translation_id, translationvalue: dictionary.value, contentid: dictionary.contentid });
          } else if ( dictionary.isnew && dictionary.translationvalue!='' ) {
            newDictList.push({ translation_id: null, translationvalue: dictionary.value, contentid: dictionary.contentid });
          }
        }
      })
    });

    if ( updateList.length > 0 || newList.length > 0 || updateDictList.length > 0  || newDictList.length > 0 ) {
      return {
        countrycode: this.countrycode, 
        languagecode: this.languagecode,
        lessoncode: this.lessoncode,
        versioncode: this.versioncode,
        vehiclecode: this.vehiclecode,
        newlist: newList,
        updatelist: updateList,
        newdictionarylist: newDictList,
        updatedictionarylist: updateDictList
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    let isExcelChanges: boolean;
  
    for (let propName in changes) {
      if (propName === 'exceldata') isExcelChanges = true;
      let change = changes[propName];
      let curVal  = JSON.stringify(change.currentValue);
      let prevVal = JSON.stringify(change.previousValue);
    }
    
    if (isExcelChanges) {
      this.processExceldataWithForm();
    } else if (this.lessoncode && this.countrycode && this.languagecode) {
      this.isApplied = true;
      this.content = [];
      this.show = true;
      if (!(this.vehiclecode))
        this.vehiclecode = 'PV';
      if (!(this.versioncode))
        this.versioncode = ' ';
      this.localizationService.getTranslationContent(this.lessoncode, this.countrycode, this.languagecode, this.vehiclecode, this.versioncode)
        .subscribe(resp => {
          this.content = resp;
          // console.log(this.content);
          this.constructFormGroup(resp);
          this.show = false;
        });
    }
  }

  processExceldataWithForm() {
    if (!this.exceldata) {
      this.isApplied = true;
      return;
    } 
    // this.isApplied = false;
    try {
      this.exceldata.forEach(element => {
        if (element.A && element.A!=='ID' && element.C) {
            this.updateFormValues(element.A, element.C);
        }
      });
      this.show = false;
      this.isApplied = true;
    }
    catch(e) {
      this.show = false;
      this.isApplied = true;
    }
  }

  taskGroups() { return <FormArray>this.myform.get('groups') }

  updateFormValues(id, value) {
    // console.log(this.myform.controls['tasks']);
    // console.log(this.myform.controls['groups']);

    (<FormArray>this.myform.get('tasks')).controls.forEach(control => {
      if (control ) {
        var isFound: boolean;
        //&& (<FormArray>control.get('taskname')
        //control.controls['taskname'].setValue(control.value.taskname + '!',{onlySelf: true, emitEvent:true});
        //(<FormControl> control.get('taskname')).setValue('!', {onlySelf: true, emitEvent:true});
        (<FormArray> control.get('groups')).controls.forEach(groupcontrol => {
          if (groupcontrol) {
            (<FormArray> groupcontrol.get('attributes')).controls.forEach(attributecontrol => {
              if (attributecontrol) {
                // console.log(attributecontrol);
                if (id == attributecontrol.get('contentid').value) {
                  // console.log(attributecontrol);
                  (attributecontrol.get('translationvalue')).setValue(value, {onlySelf: true, emitEvent:true});
                  isFound = true;
                }
              }
            })
          }
        });
        // If not group attribute then It's a dictionary
        if (!isFound) {
          (<FormArray> control.get('dictionary')).controls.forEach(dictionarycontrol => {
            if (dictionarycontrol) {
              if (id == dictionarycontrol.get('content_id').value) {
                // console.log(dictionarycontrol);
                (dictionarycontrol.get('value')).setValue(value, {onlySelf: true, emitEvent:true});
                isFound = true;
              }
            }
          });
        }
      }

      // console.log(control);
    });

    // (<FormArray>this.myform.get('attributes')).controls.forEach(control => {
    //   console.log(control);
    // })
  }

  CopyAllWithDefault() {
    // console.log('Copy all');
    this.localizationService.setCopyContentFlag('true');
  }

  constructFormGroup(data) {
    this.myform = new FormGroup({
      countrycode: new FormControl(this.countrycode,[]),
      languagecode:  new FormControl(this.languagecode,[]),
      lessoncode:  new FormControl(this.lessoncode,[]),
      vehiclecode:  new FormControl(this.vehiclecode,[]),
      versioncode:  new FormControl(this.versioncode,[]),
      tasks: new FormArray(this.getTasks())
    }, {updateOn: 'blur'});

    // Syntactic sugar using form builder which not support {updateOn: 'blur'}
    // this.myform = this.fb.group({
    //   countrycode: this.countrycode,
    //   languagecode: this.languagecode,
    //   lessoncode: this.lessoncode,
    //   tasks: this.fb.array(this.getTasks())
    // });
  }

  get tasks() {
    return (<FormArray>this.myform.get('tasks')).controls;
  }

  getTasks () {
    if (this.content && this.content.length && this.content.length > 0) {
      return this.content.map(task => this.fb.group({
        taskid: task.taskid,
        taskname: task.taskname,
        groups: this.fb.array(this.getGroups(task.groups)),
        dictionary: this.fb.array(this.getDictionaries(task.dictionary))
      }));
    }
  }

  getDictionaries(dictionaries: any[]) {
    return dictionaries.map( (dictionary) => {  return this.fb.group({
      content_id: dictionary.content_id,
      term: dictionary.term,
      translation_id: dictionary.translation_id,
      value: dictionary.value,
      task_id: dictionary.task_id,
      task_dictionary_id: dictionary.task_dictionary_id,
      isnew: dictionary.isnew,
      altered: dictionary.altered
    }) });
  }

  getGroups(groups: any[]) {
    return groups.map(group => this.fb.group({
      id: group.id,
      name: group.name,
      icon: group.icon,
      attributes: this.fb.array(this.getAttributes(group.attributes))
    }));
  }

  getAttributes(attributes: any[]) {
    return attributes.map(attribute => new FormGroup({
      name: new FormControl(attribute.name,[]),
      contentid: new FormControl(attribute.contentid,[]),
      value: new FormControl(attribute.value,[]),
      translationvalue: new FormControl(attribute.translationvalue || '', { updateOn: 'blur'}),
      placeholder: new FormControl(attribute.placeholder,[]),
      label: new FormControl(attribute.label,[]),
      defaultvalue: new FormControl(attribute.defaultvalue,[]),
      type: new FormControl(attribute.type,[]),
      element: new FormControl(attribute.element,[]),
      altered: new FormControl(attribute.altered,[]),
      translation_id: new FormControl(attribute.translation_id,[]),
      version_id: new FormControl(attribute.version_id,[]), 
      version_name: new FormControl(attribute.version_name,[]), 
      isnew: new FormControl(attribute.isnew,[]),
    }, {updateOn: 'submit'}));

  }
}