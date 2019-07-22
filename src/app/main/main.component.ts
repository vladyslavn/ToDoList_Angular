import { Component, OnInit } from '@angular/core';
import { List } from '../objects/List';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../services/list-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = 'ToDoList';

  selectedlist : List;

  lists : Array<List> = new Array<List>();

  constructor(private router : Router) {}

  ngOnInit() : void {
  }

  onSelect(list : List) {
    this.selectedlist = list;
    this.router.navigate(['/list', this.selectedlist.id]);
   }
}
