import { Component } from '@angular/core';
import { List } from '../objects/List';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  title = 'ToDoList';

  selectedlist : List;

  lists : Array<List> = new Array<List>();

  onSelect(list : List) {
    this.selectedlist = list;
  }
}
