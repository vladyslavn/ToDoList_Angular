import { Component, Input } from '@angular/core';
import { Task } from '../../objects/Task';
import { List } from '../../objects/List';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  _list : List;
  tasks : Array<Task> = new Array();
  elemText : String = "task";

  constructor(private taskService: TaskService) {}

  @Input()
  set list(list : List) {
    if (list != null) {
      this.taskService.getTasksByListId(list.id)
      .subscribe(<Task>(ts) => {
        this.tasks = ts;
      });
      this._list = list;
    }
  }

  deleteTask(task : Task) {
    this.taskService.deleteTask(task)
    .subscribe( () =>
      this.tasks.splice(this.tasks.indexOf(task), 1)
      );
  }

  createTask(text : string) {
    this.taskService.createTask({parentId: this._list.id, name: text, isDone: false})
    .subscribe(<Task>(task) => this.tasks.push(task));
  }

  updateTask(task : Task) {
    this.taskService.updateTask(task)
    .subscribe();
  }
}