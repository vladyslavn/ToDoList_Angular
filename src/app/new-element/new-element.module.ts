import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  exports: [
    FormComponent
  ]
})
export class NewElementModule { }
