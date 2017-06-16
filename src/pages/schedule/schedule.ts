import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DayTemperaturePage } from '../day-temperature/day-temperature';
import { NightTemperaturePage } from '../night-temperature/night-temperature';
import { DayPage } from '../day/day';
import { ThermoService } from '../../app/services/thermo.service';
import { AlertController } from 'ionic-angular';
import { AddPeriodPage } from '../add-period/add-period';

@Component({
  selector: 'schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  nightTemp: number;
  dayTemp: number;
  days: day[];
  daysMessage: string[];
  canClear: boolean;
  canAdd: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private thermoService:ThermoService, private alertCtrl: AlertController) {
    this.getNightTemp();
    this.getDayTemp();
    this.setDays();    
  } 

  ionViewWillEnter() {
    this.getNightTemp();
    this.getDayTemp();    
    this.setDays();
    this.setClear();
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

  setDays() {
      this.days = [
        {day: "Monday", period: this.thermoService.Program['Monday'].length},
        {day: "Tuesday", period: this.thermoService.Program['Tuesday'].length},
        {day: "Wednesday", period: this.thermoService.Program['Wednesday'].length},
        {day: "Thursday", period: this.thermoService.Program['Thursday'].length},
        {day: "Friday", period: this.thermoService.Program['Friday'].length},
        {day: "Saturday", period: this.thermoService.Program['Saturday'].length},
        {day: "Sunday", period: this.thermoService.Program['Sunday'].length}
      ]
  }

  setClear() {
    if(this.thermoService.Program['Monday'].length == 0 && this.thermoService.Program['Tuesday'].length == 0 && this.thermoService.Program['Wednesday'].length == 0 &&  this.thermoService.Program['Thursday'].length == 0 &&  this.thermoService.Program['Friday'].length == 0 &&  this.thermoService.Program['Saturday'].length == 0 &&  this.thermoService.Program['Sunday'].length == 0){
      this.canClear = false;
      this.canAdd = true;
    } else if(this.thermoService.Program['Monday'].length == 5 && this.thermoService.Program['Tuesday'].length == 5 && this.thermoService.Program['Wednesday'].length == 5 &&  this.thermoService.Program['Thursday'].length == 5 &&  this.thermoService.Program['Friday'].length == 5 &&  this.thermoService.Program['Saturday'].length == 5 &&  this.thermoService.Program['Sunday'].length == 5){
      console.log("can't add");
      this.canClear = true;
      this.canAdd = false; 
    } else {
      this.canClear = true;
      this.canAdd = true;
    }
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

  clearFullSchedule(){
    let alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete all periods in your schedule?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.thermoService.clearWholeSchedule();
            this.canClear = false;
            this.canAdd = true;
          }
        }
      ]
    });
    alert.present();
  }

  goToAddPeriod() { 
    this.navCtrl.push(AddPeriodPage, {
      day: 'None'
    });
  }
}

interface day {
  day: string;
  period: number;
}