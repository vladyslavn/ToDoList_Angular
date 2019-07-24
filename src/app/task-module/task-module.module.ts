import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewElementModule } from '../new-element/new-element.module';

@NgModule({
  declarations: [
    NewTaskComponent,
    TasksComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    NewElementModule
  ],
  exports: [
    TasksComponent
  ]
})
export class TaskModuleModule { }
