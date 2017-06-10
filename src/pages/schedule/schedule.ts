import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ThermoService } from '../../app/services/thermo.service';

@Component({
  selector: 'schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  program: Program;
  programNum: Program; 
  dayTemp: number;
  nightTemp: number;
  startTime: string;
  endTime: string;
  onDay: string;
  startTimeNum: number;
  endTimeNum: number;

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

    this.programNum = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    };

/*
    this.startTime = "5:00";
    this.endTime = "9:00";
    this.onDay = "Monday";
    this.addPeriod();

    this.startTime = "7:00";
    this.endTime = "8:00";
    this.onDay = "Monday";
    this.addPeriod();

    this.startTime = "4:00";
    this.endTime = "7:30";
    this.onDay = "Monday";
    this.addPeriod();

    this.startTime = "19:00";
    this.endTime = "20:30";
    this.onDay = "Monday";
    this.addPeriod();

    this.startTime = "10:00";
    this.endTime = "12:30";
    this.onDay = "Monday";
    this.addPeriod();

    this.startTime = "11:00";
    this.endTime = "15:00";
    this.onDay = "Monday";
    this.addPeriod();

    this.startTime = "4:00";
    this.endTime = "20:30";
    this.onDay = "Monday";
    this.addPeriod();*/

    //this.sortMergeProgram("Monday");
    
    this.getWeekProgram();

    console.log(this.program);

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

  getWeekProgram() {
      this.thermoService.get("weekProgram").subscribe(response => {
        console.log(response);
        for(var day in response.week_program.days) {
          console.log(day); 
          for(var switches in response.week_program.days[day]){
            for (var sw in response.week_program.days[day][switches]){
              if(response.week_program.days[day][switches][sw].state == 'on'){
                if(response.week_program.days[day][switches][sw].type == 'day') {
                  var temp1 = this.parseTime(response.week_program.days[day][switches][sw].time);
                  this.program[day].push([temp1, 0]);
                } else {
                  var temp2 = this.parseTime(response.week_program.days[day][switches][sw].time);
                  this.program[day][this.program[day].length-1][1] = temp2;
                }
              }
            }
          }
        }
      });
  }

  addPeriod() {
    this.startTimeNum = this.parseTime(this.startTime);
    this.endTimeNum = this.parseTime(this.endTime);
    this.program[this.onDay].push([this.startTimeNum, this.endTimeNum]);
    //console.log(this.program[this.onDay]);
    this.sortMergeProgram(this.onDay);
  }

  sortMergeProgram(day) {
    this.program[day].sort( function(period1, period2) {
      if(period1[0] < period2[0]) {
        return -1;
      } else if (period1[0] > period2[0]) {
        return 1;
      } else {
        return 0;
      }
    });

    for(var i = 0; i < this.program[day].length - 1; i++) {
      if(this.program[day][String(i)][1] >= this.program[day][String(i+1)][0]) {
          var start = this.program[day][String(i)][0];
          var end;
          if(this.program[day][String(i)][1] > this.program[day][String(i+1)][1]) {
            end = this.program[day][String(i)][1];
          } else {
            end = this.program[day][String(i+1)][1];
          }
          this.program[day].splice(String(i), 2);
          this.program[day].push([start, end]);
          this.sortMergeProgram(day);
      }
    }
    console.log(this.program[day]);
  }

  setWeekProgram() {
    var doc = document.implementation.createDocument(null, null, null);


  }

  parseTime(t) {
    return parseFloat(t.substr(0,2)) + parseFloat(t.substr(3,2))/60;
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