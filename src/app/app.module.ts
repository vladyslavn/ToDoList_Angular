import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { ListComponent } from './list/list.component';
import { ListsComponent } from './lists/lists.component';
import { NewListComponent } from './new-list/new-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    NewTaskComponent,
    TasksComponent,
    ListComponent,
    ListsComponent,
    NewListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
