import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskModuleModule } from './task-module/task-module.module';
import { ListModuleModule } from './list-module/list-module.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TaskModuleModule,
    BrowserModule,
    FormsModule,
    ListModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
