import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dl',
  templateUrl: './dl.component.html',
  styleUrls: ['./dl.component.scss']
})
export class DlComponent implements OnInit, OnChanges {
  @Input('data') data;
  @Input('keys') keys;
  @Input('editable') editable;
  inputChanges: boolean = false;

  constructor( )
  { }
  inputChange(defaultValue: string, value: string, input: any){
    this.inputChanges = true
  }
  ngOnInit() {
    //console.log('LODADED LIST DATA: ', this.data);

  }
  ngOnChanges(changes: SimpleChanges) {
      //console.log('CHANGE HAPPENED');
  }

}
