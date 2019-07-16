import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  text : string = "";
  @Output() createTask = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  addNewTask() {
    this.createTask.emit(this.text);
    this.text = "";
  }
}
