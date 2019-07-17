import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { List } from '../objects/List';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {

  @Input() lists : Array<List> = new Array();
  @Output() select = new EventEmitter<List>();
  
  selectedList: List;
  
  constructor() { }

  ngOnInit() {
    this.selectedList = this.lists[0];
    this.select.emit(this.selectedList);
  }

  deleteList(lists : List) {
    this.lists.splice(this.lists.indexOf(lists), 1);
    if (this.lists.length == 0) {
      this.ngOnInit();
    }
  }

  createList(text : string) {
    this.lists.push(new List(1, text));
  }

  onSelect(list : List) {
    this.selectedList = list;
    this.select.emit(list);
  }
}
