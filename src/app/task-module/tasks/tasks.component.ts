import { Component, Input } from '@angular/core';
import { Task } from '../../objects/Task';
import { List } from '../../objects/List';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  _list : List;
  tasks : Array<Task> = new Array();

  @Input()
  set list(list : List) {
    if (list != null) {
      this._list = list;
      fetch("http://localhost:3000/tasks", {
        method: 'GET',
      }).then(response => response.json()
      .then((data) => {
        this.tasks = data.filter(t => (this._list != null ? t.parentId == list.id : t.id == -1));
      }));
    }
  }

  deleteTask(task : Task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
    fetch("http://localhost:3000/tasks/" + task.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json());
  }

  createTask(text : string) {
    fetch("http://localhost:3000/tasks", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({parentId: this._list.id, name: text, isDone: false})
    })
    .then(response => {
      return response.json();
    }).then(task => this.tasks.push(task));
  }

  updateTask(task : Task) {
    fetch("http://localhost:3000/tasks/" + task.id, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
        }    
    })
    .then(response => response.json());
  }
}
