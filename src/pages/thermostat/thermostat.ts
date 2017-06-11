import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ThermoService } from '../../app/services/thermo.service';
import { ToastController } from 'ionic-angular';
import * as $ from 'jquery';

@Component({
  selector: 'thermostat',
  templateUrl: 'thermostat.html'
})
export class ThermostatPage {
  currentTemp: number;
  targetTemp: number;
  locked: boolean;
  currentDay: string;
  currentTime: string;
  servers: string;

  constructor(public navCtrl: NavController, private thermoService:ThermoService, public toastCtrl: ToastController) {
    this.initialize();
    this.servers = '004';
   
    var temp = this;
    setInterval(function() {
      temp.getCurrentTemperature();
      temp.getCurrentDay();
      temp.getCurrentTime();
    }, 100);
  }

  ionViewWillEnter() {
    this.initialize();
  }

  initialize() {
      this.getLock(); 
      this.getCurrentTemperature(); 
      this.getTargetTemperature(); 
      this.getCurrentDay();    
      this.getCurrentTime();
  }

  getLock() {
      this.thermoService.get("weekProgramState").subscribe(response => {
        if(response.week_program_state == "off") {
          this.thermoService.setProgramState(false);
          this.locked = true; 
        } else {
          this.thermoService.setProgramState(true);
          this.locked = false;
        }
      });
  }

  getCurrentTemperature(){
      this.thermoService.get("currentTemperature").subscribe(response => {
        this.currentTemp = response.current_temperature;
      });
  }
 
  getTargetTemperature(){ 
      this.thermoService.get("targetTemperature").subscribe(response => {
        this.targetTemp = Number(response.target_temperature);
      });
  }

  setTargetTemp(){
    if(this.targetTemp > 30) {
      this.presentTooHigh();
      this.targetTemp = 30;
    } 
    if(this.targetTemp < 5) {
      this.presentTooLow();
      this.targetTemp = 5;
    }
    this.thermoService.put("targetTemperature", {"target_temperature" : (this.targetTemp).toString()}).subscribe();
    console.log("go");
  }

  tempUp(){
    if(this.targetTemp < 29.6) {
      this.targetTemp = this.targetTemp + 0.5;
    } else {
      this.targetTemp = 30;
      this.presentTooHigh();
    }
    this.setTargetTemp();
  }

  tempDown(){
    if(this.targetTemp > 5.5) {
      this.targetTemp = this.targetTemp - 0.5;
    } else {
      this.targetTemp = 5;
      this.presentTooLow();
    }
    this.setTargetTemp();
  }

  toggleLock(){
    if(this.locked == true) {
      this.locked = false;
      this.thermoService.setProgramState(true);
      this.setLockOff();
    } else {
      this.thermoService.setProgramState(false);
      this.locked = true;
      this.setLockOn();
    }
  }

  setLockOn(){
      this.thermoService.put("targetTemperature", {"target_temperature" : (this.targetTemp).toString()}).subscribe();
      this.thermoService.put("weekProgramState", {"week_program_state" : "off"}).subscribe();
  }

  setLockOff(){
      this.thermoService.put("weekProgramState", {"week_program_state" : "on"}).subscribe();
  }

  getCurrentDay(){
      this.thermoService.get("day").subscribe(response => {
        this.currentDay = response.current_day;
      });
  }

  getCurrentTime(){
      this.thermoService.get("time").subscribe(response => {
        this.currentTime = response.time;
      });
  }

  presentTooHigh() {
    console.log("Too High!");
    let toast = this.toastCtrl.create({
      message: 'That temperature is too high. The maximum is 30 degrees C.',
      duration: 3000
    });
    toast.present();
  }

  presentTooLow() {
    console.log("Too Low!");
    let toast = this.toastCtrl.create({
        message: 'That temperature is too low. The minimum is 5 degrees C.',
        duration: 5000
      });
      toast.present();
  }
}
