import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<String>();


  onSelect(feature: string) {
    console.log(feature,"feature got ")
    this.featureSelected.emit(feature);
  }
}
