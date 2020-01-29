import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'black-ball';
  populateLocations(){
    console.log('here');
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position);
        },
        error => {
          console.log('some error while getting the possition',error.code);
        }
      );
    }
  }
}
