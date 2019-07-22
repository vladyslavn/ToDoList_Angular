import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskModuleModule } from './task-module/task-module.module';
import { ListModuleModule } from './list-module/list-module.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'list/:id', component: MainComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    TaskModuleModule,
    BrowserModule,
    FormsModule,
    ListModuleModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
