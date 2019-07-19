import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ListsComponent } from './lists/lists.component';
import { NewListComponent } from './new-list/new-list.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent,
    ListsComponent,
    NewListComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule
  ],
  exports: [
    ListsComponent
  ]
})
export class ListModuleModule { }
