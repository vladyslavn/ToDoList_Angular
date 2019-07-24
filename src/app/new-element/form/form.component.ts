import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  text : string = "";

  @Input() elemText;
  @Output() createElem = new EventEmitter<string>();

  addNewElement() {
    this.createElem.emit(this.text);
    this.text = "";
  }
}
