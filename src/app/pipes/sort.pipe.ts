import { Pipe } from "@angular/core";

@Pipe({
  name: "sort"
})
export class ArraySortPipe {
  transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
// example - *ngFor="let myObj of myArr | sort:'fieldName'"
/*
@Component({
    (...)
    template: `
      <li *ngFor="list | sort"> (...) </li>
    `,
    pipes: [ ArraySortPipe ]
  })
*/