import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { List } from '../../objects/List';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from 'src/app/services/list-service';
import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { map, tap, switchMap, scan } from 'rxjs/operators';

interface ListAction {
  (lists: List[]): List[]
}

const applyAction = (lists, action) => action(lists);

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})


export class ListsComponent implements OnInit {

  @Output() select = new EventEmitter<List>();
  
  lists$ : Observable<List[]>;
  activeList$ : Observable<List>;

  actions$: Subject<ListAction> = new BehaviorSubject(lists => lists);
  constructor(
    private listService: ListService,
    private activeRoute: ActivatedRoute,
    private router: Router) {}
  
  ngOnInit() {
    let listId$ = this.activeRoute.paramMap.pipe(map(p => +p.get('id')));
    let lists$ = this.listService.getLists();

    this.activeList$ = combineLatest(listId$, lists$)
      .pipe(map(([id, lists]) => lists.find(l => l.id == id)));

    this.activeList$.subscribe(this.select.emit);

    this.lists$ = lists$
      .pipe(
        switchMap((lists) => {
          return this.actions$.pipe(
            scan<ListAction, List[]>(applyAction, lists)
          )
        })
      )

  }

  createList(listName : string) {
    this.listService.createList({name: listName})
      .pipe(
        map(list => lists => [...lists, list]),
      )
      .subscribe(action => {
        this.actions$.next(action)
      })
  }

  deleteList(list : List) {
    this.listService.deleteListById(list.id)
      .pipe(
        map(_ => lists => {
          let index = lists.indexOf(list);
          return lists.slice(0, index).concat(lists.slice(index + 1));
        })
      )
      .subscribe(action => {
          this.actions$.next(action);
        }
      );
  }

  onSelect(list : List) {
    this.activeList$.subscribe(list => {
        this.select.emit(list);
        this.router.navigate(['/list', list.id]);
      }
    );
  }
}
