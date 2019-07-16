import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../objects/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task : Task;
  @Output() delete = new EventEmitter<Task> ();

  isEditing : boolean = false;
  editingText : string;

  constructor() { 
    
  }

  ngOnInit() {
    
  }
  
  deleting() {
    this.delete.emit(this.task);
  }

  editing() {
    this.isEditing = !this.isEditing;
    this.editingText = this.task.name;
  }

  editingSave() {
    if (this.editingText.trim().length > 0) {
      this.task.name = this.editingText;
      this.isEditing = !this.isEditing;
    }
  }
}