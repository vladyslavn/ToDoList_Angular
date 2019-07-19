import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './new-task/new-task.component';


@NgModule({
  declarations: [
    NewTaskComponent,
    TasksComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  exports: [
    TasksComponent
  ]
})
export class TaskModuleModule { }
