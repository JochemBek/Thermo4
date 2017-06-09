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
  dayTempTen: number;
  nightTempTen: number;

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
  }
 
  getNightTemp(){  
  }

  setDayTemp(){
  }

  dayTempUp(){
  }

  dayTempDown(){
  }

  setNightTemp(){
  }

  nightTempUp(){
  }

  nightTempDown(){
  }
}

interface days {
  day: string;
  content: string; 
}