
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'sortTable', pure: false})
export class OrderBy implements PipeTransform {

	value:string[] =[];

	static _orderByComparator(a:any, b:any):number{
        
        if(a === null || typeof a === 'undefined') a = 0;
        if(b === null || typeof b === 'undefined') b = 0;

		if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
			//Isn't a number so lowercase the string to properly compare
			if(a.toLowerCase() < b.toLowerCase()) return -1;
			if(a.toLowerCase() > b.toLowerCase()) return 1;
		}
		else{
			//Parse strings as numbers to compare properly
			if(parseFloat(a) < parseFloat(b)) return -1;
			if(parseFloat(a) > parseFloat(b)) return 1;
		}

		return 0; //equal each other
	}

    transform(input:any, config:string = '+'): any{

    	//make a copy of the input's reference
    	this.value = [...input];
    	var value = this.value;
        
        if(!Array.isArray(value)) return value;

        if(!Array.isArray(config) || (Array.isArray(config) && config.length == 1)){
            var propertyToCheck:string = !Array.isArray(config) ? config : config[0];
            var desc = propertyToCheck.substr(0, 1) == '-';
            
            //Basic array
            if(!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+'){
                return !desc ? value.sort() : value.sort().reverse();
            }
            else {
                var property:string = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;

                return value.sort(function(a:any,b:any){
                    return !desc 
                        ? OrderBy._orderByComparator(a[property], b[property]) 
                        : -OrderBy._orderByComparator(a[property], b[property]);
                });
            }
        }
        else {
            //Loop over property of the array in order and sort
            return value.sort(function(a:any,b:any){
                for(var i:number = 0; i < config.length; i++){
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];

                    var comparison = !desc 
                        ? OrderBy._orderByComparator(a[property], b[property]) 
                        : -OrderBy._orderByComparator(a[property], b[property]);
                    
                    //Don't return 0 yet in case of needing to sort by next property
                    if(comparison != 0) return comparison;
                }

                return 0; //equal each other
            });
        }
    }
}

/*
HTML

<table class="table table-hover table-striped table-sortable">
  <thead>
    <tr>
      <th *ngFor="let column of columns" [class]="selectedClass(column.variable)" (click)="changeSorting(column.variable)">
        {{column.display}}
      </th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let object of data | orderBy : convertSorting()">
      <td *ngFor="let column of columns">
        {{object[column.variable] | format : column.filter}}
      </td>
    </tr>
  </tbody>
</table>

*/


/*
TYPESCRIPT

import {Component, Input} from 'angular2/core'
import {OrderBy} from "./orderBy"
import {Format} from "./format"

@Component({
  selector: 'table-sortable',
  templateUrl: 'src/tableSortable.html',
  pipes: [OrderBy, Format]
})
export class TableSortable {
  
  @Input() columns: any[];
  @Input() data: any[];
  @Input() sort: any;
  
  selectedClass(columnName): string{
    return columnName == this.sort.column ? 'sort-' + this.sort.descending : false;
  }
  
  changeSorting(columnName): void{
    var sort = this.sort;
    if (sort.column == columnName) {
      sort.descending = !sort.descending;
    } else {
      sort.column = columnName;
      sort.descending = false;
    }
  }
  
  convertSorting(): string{
    return this.sort.descending ? '-' + this.sort.column : this.sort.column;
  }
}


*/