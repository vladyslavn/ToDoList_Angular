import { Component, OnInit } from '@angular/core';
import { Task } from '../objects/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks : Array<Task> = new Array();
  
  constructor() { }

  ngOnInit() {
  }

  deleteTask(task : Task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  createTask(text : string) {
    this.tasks.push(new Task(100, 1, text, false));
  }
}
