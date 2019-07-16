import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { List } from '../objects/List';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list : List;

  @Output() deleteList = new EventEmitter<List> ();

  constructor() { }

  
  ngOnInit() {
  }

  deleting() {
    this.deleteList.emit(this.list);
  }

}
