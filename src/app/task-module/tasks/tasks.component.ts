import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../objects/Task';
import { List } from '../../objects/List';
import { TaskService } from 'src/app/services/task-service';
import { Observable, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, tap, switchMap, scan } from 'rxjs/operators';

interface TaskAction {
  (tasks: Task[]): Task[]
}

const applyAction = (tasks, action) => action(tasks);

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  listId$ : Observable<number>;
  tasks$ : Observable<Task[]>;

  listId : number;

  actions$: Subject<TaskAction> = new BehaviorSubject(tasks => tasks);

  constructor(
    private taskService: TaskService,
    private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.listId$ = this.activeRoute.paramMap.pipe(
      map(p => {
        this.listId = +p.get('id');
        return this.listId;
      }));

    this.listId$
      .subscribe(() => {
        this.tasks$ = this.taskService.getTasksByListId(this.listId)
          .pipe(
            switchMap((tasks) => {
              this.actions$ = new BehaviorSubject(tasks => tasks);
              return this.actions$.pipe(
                scan<TaskAction, Task[]>(applyAction, tasks)
              )
            })
          )
      })
  }

  deleteTask(task : Task) {
    this.taskService.deleteTask(task)
      .pipe(
        map(_ => tasks => {
          let index = tasks.indexOf(task);
          return tasks.slice(0, index).concat(tasks.slice(index + 1));
        })
      )
      .subscribe(action => {
          this.actions$.next(action);
        }
      );
  }

  createTask(text : string) {
    this.taskService.createTask({listId: this.listId, name: text, isDone: false})
    .pipe(
      map(task => tasks => [...tasks, task]),
    )
    .subscribe(action => this.actions$.next(action));
  }

  updateTask(task : Task) {
    this.taskService.updateTask(task)
      .subscribe();
  }
}
