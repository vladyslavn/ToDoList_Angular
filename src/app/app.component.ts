import { OnInit, Component } from '@angular/core';
import { List } from './objects/List';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ToDoList';

  selectedlist : List;

  lists : Array<List> = new Array<List>();

  constructor() { }

  ngOnInit() {
    this.lists.push(
      new List(1, "master"),
      new List(2, "second"),
      new List(3, "third")
    );
  }

  onSelect(list : List) {
    this.selectedlist = list;
  }
}
