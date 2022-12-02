import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DictionaryService } from '../../dictionary.service';
import { TaskService } from '../../../task/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dictionary-multiselect-list',
  templateUrl: './dictionary-multiselect-list.component.html',
  styleUrls: ['./dictionary-multiselect-list.component.scss']
})
export class DictionaryMultiselectListComponent implements OnInit {
  @Input()
    destination;
  @Input()
    selectable: boolean;
  @Input()
    modal;
  @Input()
    task_id;
  @Output()
    itemsSelected = new EventEmitter<any>(); 

  public dictionary;
  selectedTerms: Array<any> =[];
  oldTerms: Array<any> =[];

	constructor(
    private dictionaryService: DictionaryService,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.getDictionary()
    if(this.task_id){
      this.getTaskTerms(this.task_id)
    }
  }

  selectedItems() {
    let addList = [];
    let delList = [];

    this.selectedTerms.forEach((term, index) => {
      let obj = this.oldTerms.find((obj) => { 
        return obj["term_id"] == term["term_id"]; 
      });

      if (obj === undefined) {
        addList.push(term["term_id"]);
      }

      //console.error('addList OBJ: ', addList)
    });

    this.oldTerms.forEach((term, index) => {
      let obj = this.selectedTerms.find((obj) => { 
        return obj["term_id"] == term["term_id"];
      });

      if (obj == null) {
        delList.push(term["term_id"]);
      }

      //console.error('delList : ', delList)
    });

    // //console.log('SELETCED ITEMS EVENT <MODAL>: ', event)
    let taskTermList = {
      'add': addList,
      'delete': delList
    };

    this.itemsSelected.emit(taskTermList);
  }

	getTaskTerms(task_id) {
    this.taskService
      .getTaskTerms(task_id)
      .subscribe((data) => {
        this.oldTerms = data;
        this.selectedTerms = data;
        //console.log('TASK TERMS: ', data)
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      })
  }

	getDictionary() {
    this.dictionaryService
      .getTerms()
      .subscribe((data) => {
        this.dictionary = data;
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
      // this.changeTask(event.data.term_id);
    }
    else {
      this.router.navigate([`/dictionary/${event.data.term_id}`]);
    }
  }

}
