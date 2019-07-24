import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './list/list.component';
import { NewElementModule } from '../new-element/new-element.module';

@NgModule({
  declarations: [
    ListComponent,
    ListsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    NewElementModule
  ],
  exports: [
    ListsComponent
  ]
})
export class ListModuleModule { }
