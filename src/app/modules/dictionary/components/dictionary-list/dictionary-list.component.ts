import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DictionaryService } from '../../dictionary.service';
import { TaskService } from '../../../task/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.scss']
})
export class DictionaryListComponent implements OnInit {
  @Input()
    destination;
  @Input()
    selectable: boolean;
  @Input()
    modal;
  @Input()
    task_id;
  @Output()
    selectedTerms;
    
  @Output()
    itemsSelected = new EventEmitter<any>(); 
  
  selected = [];
  private taskTerms;
  dictionary;

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
  selectedItems(event){
    //console.log('SELETCED ITEMS EVENT <MODAL>: ', event)
    let taskTermList = {
      'cur' : this.taskTerms,
      'new' : event
    }
    this.itemsSelected.emit(taskTermList);
  }

	getTaskTerms(task_id) {
    this.taskService
      .getTaskTerms(task_id)
      .subscribe((data) => {
        for (let term of data) {
          this.selected.push(term.term_id);
        }
        this.taskTerms = data;
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
