import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { List } from '../../objects/List';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from 'src/app/services/list-service';
import { Observable, combineLatest, Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { map, tap, switchMap, scan, filter, throttleTime, withLatestFrom, debounceTime } from 'rxjs/operators';

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

  lists$ : Observable<List[]>;
  activeList$ : Observable<List>;
  selectedList$ : Observable<List>;

  actions$ : Subject<ListAction> = new BehaviorSubject(lists => lists);

  static getEvents() {
    return fromEvent(document, 'keydown')
      .pipe(
        filter(<KeyboardEvent>(event) => event.key === 'ArrowUp' || event.key === 'ArrowDown')
      );
  }

  constructor(
    private listService: ListService,
    private activeRoute: ActivatedRoute,
    private router: Router) {}
  
  ngOnInit() {
    const listId$ = this.activeRoute.params.pipe(map(u => +u.id));
    this.lists$ = this.listService.getLists().pipe(
      switchMap((list) => {
        return this.actions$.pipe(scan<ListAction, List[]>(applyAction, list));
      })
    );
    this.activeList$ = combineLatest(listId$, this.lists$).pipe(
      map(([id, lists]) => lists.find(l => l.id === id))
    );
    this.selectedList$ = this.activeList$;
    
    ListsComponent.getEvents()
    .pipe(
      throttleTime(100),
      withLatestFrom(this.selectedList$, this.lists$),
      map(this.getNextList),
    ).subscribe(
      list => this.onSelect(list)
    );
  }

  getNextList = ([event, list, lists]) => {
    if (event.key === 'ArrowDown') {
      return this.getNext(lists, list);
    } else {
      return this.getPrevious(lists, list);
    }
  }

  getNext(lists: List[], selectedList: List) {
    const index = lists.findIndex(l => l.id === selectedList.id);
    return (lists[index + 1]) ? lists[index + 1] : lists[0];
  }

  getPrevious(lists: List[], selectedList: List) {
    const index = lists.findIndex(l => l.id === selectedList.id);
    return (lists[index - 1]) ? lists[index - 1] : lists[lists.length - 1];
  }

  createList(listName : string) {
    this.listService.createList({name: listName})
      .pipe(
        map(list => lists => {
          this.onSelect(list);
          return [...lists, list]
        }),
      )
      .subscribe(action => {
        this.actions$.next(action)
      })
  }

  deleteList(list : List) {
    event.stopPropagation();

    this.listService.deleteListById(list.id)
      .pipe(
        map( () => lists => {
          let index = lists.indexOf(list);
          let l = lists.slice(0, index).concat(lists.slice(index + 1));
          if (l.length <= 0) {
            this.createList("master");
          } else {
            this.onSelect(l[0]);
          }
          return l;
        })
      )
      .subscribe(action => {
          this.actions$.next(action);
        }
      );
  }

  onSelect(list : List) {
    this.router.navigate(['/list', list.id]);
  }
}
