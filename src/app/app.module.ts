import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ThermostatPage } from '../pages/thermostat/thermostat';
import { SchedulePage } from '../pages/schedule/schedule';
import { TabsPage } from '../pages/tabs/tabs';
import { DayTemperaturePage } from '../pages/day-temperature/day-temperature'; 
import { NightTemperaturePage } from '../pages/night-temperature/night-temperature';
import { DayPage } from '../pages/day/day';
import { AddPeriodPage } from '../pages/add-period/add-period';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SchedulePage,
    ThermostatPage,
    TabsPage,
    DayTemperaturePage,
    NightTemperaturePage,
    DayPage,
    AddPeriodPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SchedulePage,
    ThermostatPage,
    TabsPage,
    DayTemperaturePage,
    NightTemperaturePage,
    DayPage,
    AddPeriodPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
