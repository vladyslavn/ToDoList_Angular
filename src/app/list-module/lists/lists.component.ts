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

  elemText : String = "list";

  constructor(
    private listService: ListService,
    private taskService: TaskService,
    private activeRoute: ActivatedRoute,
    private router: Router) {}
  
  ngOnInit() {
    this.listService.getLists()
    .subscribe(<List>(data) => {
      this.lists = data;
      if (this.lists.length == 0) {
        this.createList("master");
      } else {
        let id = +this.activeRoute.snapshot.paramMap.get('id');
        for (let i = 0; i < this.lists.length; i++) {
          if (id == this.lists[i].id) {
            this.onSelect(this.lists[i]);
            break;
          } else if (i + 1 >= this.lists.length) {
            this.onSelect(this.lists[0]);
          }
        }
      }
    });
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
        this.taskService.deleteTask(t)
        .subscribe();
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
    this.router.navigate(['/list', this.selectedList.id]);
  }
}
