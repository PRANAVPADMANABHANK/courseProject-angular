import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  array1 = [1, 2, 3, 4, 5];
  array2 = ['A', 'B', 'C'];

  myObservable = from(this.array1).pipe(  //this pipe contains the sequence of operators like map and filter.
  map((value) => {
    return value * 5;
  }),filter((value)=>{
    return value>=15
  })
);  //here 'from' operator will create a new Observable calle myObservable


//-------------------------------------------------------


//this pipe contains the sequence of operators like map and filter.

// transformObservable = this.myObservable.pipe(  
//     map((value) => {
//       return value * 5;
//     }),filter((value)=>{
//       return value>=15
//     })
//   );


//--------------------------------------------------------

  // filterObservable = this.transformObservable.pipe(filter((value)=>{
  //   return value >= 15
  // }))

  

  ngOnInit() {
    this.myObservable.subscribe(
      (value) => {
        console.log(value);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        alert('Observable has completed emitting all values.');
      }
    );
  }   
}
