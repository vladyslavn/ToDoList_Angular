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
    for (let i : number = 0; i < 10; i++) {
      this.tasks.push(new Task(i, 1, "Call" + i, i % 2 == 0));
    }
  }

}
