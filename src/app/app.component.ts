import { Component, Output, EventEmitter} from '@angular/core';
import { List } from './objects/List';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoList';

  selectedlist : List;

  lists : Array<List> = new Array<List>();

  onSelect(list : List) {
    this.selectedlist = list;
  }
}
