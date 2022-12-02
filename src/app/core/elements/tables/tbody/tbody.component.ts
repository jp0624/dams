import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tbody',
  templateUrl: './tbody.component.html',
  styleUrls: ['./tbody.component.scss']
  //,changeDetection: ChangeDetectionStrategy.OnPush
})
export class TbodyComponent implements OnInit {
  @Input('data') data;
  @Input('keys') keys;
  @Input('primary') primary;
  @Input('section') section;

  @Input()
    destination: any;
  @Input()
    sortable: any;
  @Input()
    linktable: any;
  @Input()
    selectable;
  @Input()
    selected;
    
  @Output()
    itemsSelected = new EventEmitter<any>(); 

  type = "body";

  constructor() { }

  ngOnInit() {
    //this.data.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    //this.data.sort((a, b) => a.name.localeCompare(b.name))
    this.data.sort(this.dynamicSort("order"));

    //console.error('LINK TABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', this.linktable);
  }
  changeOrder(data){
    //console.log('CHANGE DATA: ', data);
    //console.log(this.data.find(x => x.id == data.id));

    if(data.dir === 'up'){

      this.data.find(x => x.order == ( data.order -1 )).move = 'down'
      this.data.find(x => x.id == ( data.id )).move = 'up'

      setTimeout( ()=> {
        this.data.find(x => x.order == ( data.order -1 )).move = null
        this.data.find(x => x.id == ( data.id )).move = null

        this.data.find(x => x.order == ( data.order -1 )).order++
        this.data.find(x => x.id == ( data.id )).order--
        this.data.sort(this.dynamicSort("order"));
      },1000);
      //console.log('ARRAY DATA (UP): ', this.data);

    } else if(data.dir === 'down'){

      this.data.find(x => x.order == ( data.order +1 )).move = 'up'
      this.data.find(x => x.id == ( data.id)).move = 'down'

      setTimeout( ()=> {
        this.data.find(x => x.order == ( data.order +1 )).move = null
        this.data.find(x => x.id == ( data.id)).move = null

        this.data.find(x => x.order == ( data.order +1 )).order--
        this.data.find(x => x.id == ( data.id)).order++
        this.data.sort(this.dynamicSort("order"));
      },1000);

      //console.log('ARRAY DATA (DOWN): ', this.data);
    }
  }
  selectItem(item){
    //console.error('SELECT ITEM: ', item);
    //this.selected.push(item.index);
    if(this.selected.indexOf(item.id) >= 0){
      this.selected.splice(this.selected.indexOf(item.id), 1);
    } else {
      this.selected.push(item.id);
    }
    
    //console.error('SELECTED ITEMS: ', this.selected);

    
    this.itemsSelected.emit(this.selected);
  }
  isSelected(id){
    if(id && this.selected){
      return this.selected.indexOf(id) >= 0;
    } else{
      return false;
    }
  }
  removeRow(link_id){
    //console.log('DELETE ROW WITH LINK ID: ', link_id)
    //this.data.find(x => x.link_id == ( link_id ))
    //this.data.find( x => x.link_id == ( link_id ) ).move  = 'remove'
    let root = this;
    setTimeout( ()=> {
      this.data = this.data.filter(function( obj ) {
        return obj[root.primary] !== link_id;
      });
      this.data.sort(this.dynamicSort("order"));
      this.updateOrderValue()
    },500);
    
  }
  updateOrderValue(){
    for (let i in this.data) {
      //console.log('DATA TO ORDER: ', i + ' ' + this.data[i]);
      this.data[i].order = i
    }

  }
  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


}
