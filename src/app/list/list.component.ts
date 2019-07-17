import { Component, Input, Output, EventEmitter } from '@angular/core';
import { List } from '../objects/List';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input() list : List;

  @Output() deleteList = new EventEmitter<List> ();

  deleting() {
    this.deleteList.emit(this.list);
  }
}
