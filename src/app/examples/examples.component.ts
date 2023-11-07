import { Component } from '@angular/core';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css']
})
export class ExamplesComponent {

  say: any
  user = {
    firstName : "Jane Doe",
    city: "New York",
    cityCode: "NY"
  }


}
