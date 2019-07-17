import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  text : string = "";
  @Output() createList = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  addNewList() {
    this.createList.emit(this.text);
    this.text = "";
  }
}
