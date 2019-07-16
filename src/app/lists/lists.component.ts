import { Component, OnInit } from '@angular/core';
import { List } from '../objects/List';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists : Array<List> = new Array();

  constructor() { }

  ngOnInit() {
  }

  deleteList(lists : List) {
    this.lists.splice(this.lists.indexOf(lists), 1);
  }

  createList(text : string) {
    this.lists.push(new List(1, text));
  }
}
