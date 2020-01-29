import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders  } from '@angular/common/http'

const proxy = "//cors-anywhere.herokuapp.com"
const url =  `${proxy}/http://www.metaweather.com/api/location/`

class Weather{
  state_name : string;
  applciable_date : string;
  min_temp : number;
  max_temp : number;
  constructor(sn :string, ad : string, mt : number, xt : number){
    this.state_name = sn;
    this.applciable_date = ad;
    this.min_temp = mt;
    this.max_temp = xt;
  }
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  forecast : Weather[];

  columnDefs = [
      {headerName: 'State', field: 'state_name' },
      {headerName: 'Date', field: 'applciable_date' },
      {headerName: 'Min Temp', field: 'min_temp'},
      {headerName: 'Max Temp', field: 'max_temp'}
  ];

  constructor(private route: ActivatedRoute,private http:HttpClient) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id')
      this.fetchWeather(parseInt(id));
    });
  }

  fetchWeather(id : number){
    this.http.get(`${url}${id}`).toPromise()
      .then(res => {
        this.forecast = [];
        let obj :any ;
        obj = res;
        for (let index = 0; index < 2; index++) {
          if(obj && obj.consolidated_weather){
            let we = obj.consolidated_weather[index]
            this.forecast.push(new Weather(we.weather_state_name,we.applicable_date,we.min_temp,we.max_temp));
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  }
