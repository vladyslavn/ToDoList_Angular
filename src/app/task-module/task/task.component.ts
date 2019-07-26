import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../objects/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input() task : Task;

  @Output() deleteTask = new EventEmitter<Task> ();
  @Output() updateTask = new EventEmitter<Task> ();

  isEditing : boolean = false;
  editingText : string;

  deleting() {
    this.deleteTask.emit(this.task);
  }

  editing() {
    this.isEditing = !this.isEditing;
    this.editingText = this.task.name;
  }

  editingSave() {
    if (this.editingText.trim().length > 0) {
      this.task.name = this.editingText;
      this.isEditing = !this.isEditing;
      this.updateTask.emit(this.task);
    }
  }

  doTask() {
    this.task.done = !this.task.done;
    this.updateTask.emit(this.task);
  }
}