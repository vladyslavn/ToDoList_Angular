import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { List } from '../objects/List';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {

  @Output() select = new EventEmitter<List>();
  
  lists : Array<List> = new Array();

  selectedList: List;
  
  constructor() { }

  ngOnInit() {
    fetch("http://localhost:3000/lists", {
      method: 'GET',
    }).then(response => response.json()
    .then((data) => {
      this.lists = data;
      this.onSelect(this.lists[0]);
    }));
    
  }

  deleteList(list : List) {
    if (this.lists.length == 1) {
      this.createList("master");
    }
    this.lists.splice(this.lists.indexOf(list), 1);
    fetch("http://localhost:3000/lists/" + list.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json());

    fetch("http://localhost:3000/tasks", {
      method: 'GET',
    }).then(response => response.json()
    .then((data) => {
      let tasks = data.filter(t => list.id == t.parentId);
      tasks.forEach(t => {
        fetch("http://localhost:3000/tasks/" + t.id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json());
      });
    }));
    this.onSelect(this.lists[0]);
  }

  createList(text : string) {
    fetch("http://localhost:3000/lists", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: text })
    })
    .then(response => {
      return response.json();
    }).then(list => {this.lists.push(list); 
      this.onSelect(this.lists[this.lists.length - 1]);});
  }

  onSelect(list : List) {
    this.selectedList = list;
    this.select.emit(list);
  }
}
