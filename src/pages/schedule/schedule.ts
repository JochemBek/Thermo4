import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DayTemperaturePage } from '../day-temperature/day-temperature';
import { NightTemperaturePage } from '../night-temperature/night-temperature';
import { DayPage } from '../day/day';
import { ThermoService } from '../../app/services/thermo.service';

@Component({
  selector: 'schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  nightTemp: number;
  dayTemp: number;
  days: day[];

  constructor(public navCtrl: NavController, private thermoService:ThermoService) {
    this.getNightTemp();
    this.getDayTemp();

    this.days = [
      {day: "Monday", content: "Maandag"},
      {day: "Tuesday", content: "Dinsdag"},
      {day: "Wednesday", content: "Woensdag"},
      {day: "Thursday", content: "Donderdag"},
      {day: "Friday", content: "Vrijdag"},
      {day: "Saturday", content: "Zaterdag"},
      {day: "Sunday", content: "Zondag"}
    ]
  } 

  ionViewWillEnter() {
    this.getNightTemp();
    this.getDayTemp();
  }

  ionViewDidEnter() {
    this.getNightTemp();
    this.getDayTemp();
  }

  getNightTemp(){  
      this.thermoService.get("nightTemperature").subscribe(response => {
        this.nightTemp = Number(response.night_temperature);
      });
  }

  getDayTemp(){  
      this.thermoService.get("dayTemperature").subscribe(response => {
        this.dayTemp = Number(response.day_temperature);
      });
  }

  goToDay(){
    this.navCtrl.push(DayTemperaturePage);
  }

  goToNight(){
    this.navCtrl.push(NightTemperaturePage);
  }

  daySelected(day){
    console.log(day);
    this.navCtrl.push(DayPage, {
      day: day 
    });
  }
}

interface day {
  day: string;
  content: string;
}