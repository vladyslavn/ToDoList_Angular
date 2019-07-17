import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../objects/Task';
import { List } from '../objects/List';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  @Input() list : List;
  tasks : Array<Task> = new Array();

  deleteTask(task : Task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  createTask(text : string) {
    this.tasks.push(new Task(100, this.list.id, text, false));
  }
}
