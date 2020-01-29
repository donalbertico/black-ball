import { Component, OnInit,Input, Output, EventEmitter  } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';


const proxy = "//cors-anywhere.herokuapp.com"
const url =  `${proxy}/http://www.metaweather.com/api/location/search/`

export class Location{
  latitude : number;
  longitude : number;
  title : string;
  id : string;
  constructor(latt_long: string, title : string, id : string){
    let lat = parseFloat(latt_long.split(',')[0]);
    let lng = parseFloat(latt_long.split(',')[1]);
    this.latitude = lat,
    this.longitude = lng,
    this.title = title,
    this.id = id
  }
}



@Component({
  selector: 'locations',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent  {
  auxLocation = new Location('51.8833,0.9','Colchester','4564');
  list : Location[];
  noLoc : boolean;
  @Output() locationChanged = new EventEmitter<Location>();

  constructor(private http:HttpClient) {
    this.list = [];
    this.noLoc = true;
  }

  getDeviceLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        position => {
          this.noLoc = true;
          console.log(position);
        },
        error => {
          console.log('some error while getting the possition',error);
          this.noLoc = false;
        }
      );
    }else{
      this.noLoc = false;
    }
  }

  setDefault(){
    this.fetchLocations(this.auxLocation);
    this.noLoc = true;
  }

  fetchLocations(location : Location){
    this.http.get(url,{
      params : {
        lattlong : `${location.latitude},${location.longitude}`
      }
    }).toPromise()
      .then(res => {
          for(let loc in res){
            this.list.push(new Location(res[loc].latt_long,res[loc].title,res[loc].woeid))
          }
      },
      err => {
        console.log(err);

      }
    );
  }

}
