import { BrowserModule } from '@angular/platform-browser';
import { NgModule,EventEmitter} from '@angular/core';

import { AppComponent } from './app.component';
import { LocationComponent } from './location/location.component';
import { HttpClientModule,HttpClientJsonpModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {Routes, RouterModule} from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { AgGridModule } from 'ag-grid-angular';

const routes : Routes =[
  { path: '', component : LocationComponent},
  { path : 'weather/:id', component : WeatherComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatMenuModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    NoopAnimationsModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(routes, {useHash : true})
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MatMenuModule]
})
export class AppModule { }
