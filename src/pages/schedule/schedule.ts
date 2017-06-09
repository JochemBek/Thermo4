import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ThermoService } from '../../app/services/thermo.service';

@Component({
  selector: 'schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  days: days[];
  dayTemp: number;
  nightTemp: number;

  constructor(public navCtrl: NavController, private thermoService:ThermoService) {
    this.days = [{
      day: 'Monday', 
      content: 'Maandag'
    },
    {
      day: 'Tuesday', 
      content: 'Dinsdag'
    },
    {
      day: 'Wednesday', 
      content: 'Woensdag'
    },
    {
      day: 'Thursday', 
      content: 'Donderdag'
    },
    {
      day: 'Friday', 
      content: 'Vrijdag'
    },
    {
      day: 'Saturday', 
      content: 'Zaterdag'
    },
    {
      day: 'Sunday', 
      content: 'Zondag'
    }];
    
    this.getDayTemp();
    this.getNightTemp();
  }


  getDayTemp(){
      this.thermoService.get("dayTemperature").subscribe(response => {
        this.dayTemp = response.day_temperature;
      });
  }
 
  getNightTemp(){  
      this.thermoService.get("nightTemperature").subscribe(response => {
        this.nightTemp = response.night_temperature;
      });
  }

  setDayTemp(){
    if(this.dayTemp > 30) {
      this.dayTemp = 30;
    } 
    if(this.dayTemp < 5) {
      this.dayTemp = 5;
    }
    this.thermoService.put("dayTemperature", {"day_temperature" : (this.dayTemp).toString()}).subscribe();
  }

  dayTempUp(){
    if(this.dayTemp < 29.6) {
      this.dayTemp = this.dayTemp + 0.5;
    } else {
      this.dayTemp = 30;
      //Show message
    }
    this.setDayTemp();
  }

  dayTempDown(){
    if(this.dayTemp > 5.5) {
      this.dayTemp = this.dayTemp - 0.5;
    } else {
      this.dayTemp = 5;
      //Show message
    }
    this.setDayTemp();
  }

  setNightTemp(){
    if(this.nightTemp > 30) {
      this.nightTemp = 30;
    } 
    if(this.nightTemp < 5) {
      this.nightTemp = 5;
    }
    this.thermoService.put("nightTemperature", {"night_temperature" : (this.nightTemp).toString()}).subscribe();
  }

  nightTempUp(){
    if(this.nightTemp < 29.6) {
      this.nightTemp = this.nightTemp + 0.5;
    } else {
      this.nightTemp = 30;
      //Show message
    }
    this.setNightTemp();
  }

  nightTempDown(){
    if(this.nightTemp > 5.5) {
      this.nightTemp = this.nightTemp - 0.5;
    } else {
      this.nightTemp = 5;
      //Show message
    }
    this.setNightTemp();
  }
}

interface days {
  day: string;
  content: string; 
}