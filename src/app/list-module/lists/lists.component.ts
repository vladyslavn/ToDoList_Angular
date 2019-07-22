import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { List } from '../../objects/List';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from 'src/app/services/list-service';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {

  @Output() select = new EventEmitter<List>();
  
  lists : Array<List> = new Array();

  selectedList: List;

  constructor(
    private listService: ListService,
    private taskService: TaskService,
    private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.listService.getLists()
    .subscribe(<List>(data) => {
      this.lists = data;
      if (this.lists.length == 0) {
        this.createList("master");
      } else {
        this.onSelect(this.lists[0]);
      }
    });
    let snapshot = this.route.snapshot;
    this.route.params.subscribe(p => console.log('params', p));
    // debugger;
    const id = +snapshot.paramMap.get('id');
    console.log(id);
    this.listService.getListById(id).subscribe(<List>(data) => this.onSelect(data));
  }

  deleteList(list : List) {
    this.listService.deleteListById(list.id)
    .subscribe(() => {
      this.lists.splice(this.lists.indexOf(list), 1);
      if (this.lists.length == 0) {
        this.createList("master");
      } else {
        this.onSelect(this.lists[0])
      }
    });

    this.taskService.getTasksByListId(list.id)
    .subscribe(<Task>(ts) => {
      ts.forEach(t => {
        if (t.parentId == list.id) {
          this.taskService.deleteTaskById(t.id)
          .subscribe();
        }
      });
    });
  }

  createList(text : string) {
    this.listService.createList({name: text})
    .subscribe(<List>(list) => {
      this.lists.push(list);
      this.onSelect(this.lists[this.lists.length - 1]);
    });
  }

  onSelect(list : List) {
    this.selectedList = list;
    this.select.emit(list);
  }
}
