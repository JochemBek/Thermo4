import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ThermoService } from '../../app/services/thermo.service';

@Component({
  selector: 'schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  program: Program;
  dayTemp: number;
  nightTemp: number;
  startTime: string;
  endTime: string;
  onDay: string;
  sortDay: string;


  constructor(public navCtrl: NavController, private thermoService:ThermoService) {
    this.program = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    };

    this.startTime = "5:00";
    this.endTime = "9:00";
    this.onDay = "Monday";
    
    this.getWeekProgram();

    this.getDayTemp();
    this.getNightTemp();

    var temp = this;
    setTimeout(function() {
      temp.addPeriod();
    }, 5000);
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

  getWeekProgram() {
      this.thermoService.get("weekProgram").subscribe(response => {
        console.log(response);
        for(var day in response.week_program.days) {
          //console.log(day); 
          for(var switches in response.week_program.days[day]){
            //console.log(switches);
            for (var sw in response.week_program.days[day][switches]){
              if(response.week_program.days[day][switches][sw].state == 'on'){
                if(response.week_program.days[day][switches][sw].type == 'day') {
                  this.program[day].push([response.week_program.days[day][switches][sw].time, "00:00"]);
                } else {
                  this.program[day][this.program[day].length-1][1] = response.week_program.days[day][switches][sw].time;
                }
              }
            }
          }
        }
      });
  }

  addPeriod() {
    this.program[this.onDay].push([this.startTime, this.endTime]);
    console.log(this.program[this.onDay]);
    this.sortDay = this.onDay;
    this.sortMergeProgram();
  }

  sortMergeProgram() {
    //this.program[this.sortDay]
    // difficult function comes here D: 
  }

}

interface Program {
  Monday: any[];
  Tuesday: any[];
  Wednesday: any[];
  Thursday: any[];
  Friday: any[];
  Saturday: any[];
  Sunday: any[];
}