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
  lock: boolean;
  currentDay: string;
  currentTime: string;
  servers: string;
  upenabled: boolean;
  downenabled: boolean;
  inputenabled: boolean;
  inputbusy: boolean;

  constructor(public navCtrl: NavController, private thermoService:ThermoService, public toastCtrl: ToastController) {
    this.initialize();
    this.servers = '004';
   
    var temp = this;
    setInterval(function() {
      temp.getCurrentTemperature();
      temp.getCurrentDay();
      temp.getCurrentTime();
    }, 3000);
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
          this.lock = true;
          console.log("The schedule is off");
          this.inputenabled = false;
          this.upenabled = false;
          this.downenabled = false;
        } else {
          this.thermoService.setProgramState(true);
          this.lock = false;
          this.inputenabled = true;
          if(this.targetTemp < 30) {
            this.upenabled = true;
          } 
          if(this.targetTemp > 5) {
            this.downenabled = true;
          }
          console.log("The schedule is on");  
        }
      });
      console.log(this.lock);
  }

  getCurrentTemperature(){
      this.thermoService.get("currentTemperature").subscribe(response => {
        this.currentTemp = response.current_temperature;
      });
  }
 
  getTargetTemperature(){ 
      this.thermoService.get("targetTemperature").subscribe(response => {
        this.targetTemp = Number(response.target_temperature);
        if(this.targetTemp == 30) {
          this.upenabled = false;
        } else {
          if(!this.lock) {
            this.upenabled = true;
          }
        }
        if(this.targetTemp == 5) {
          this.downenabled = false;
        } else {
          if(!this.lock) {
            this.downenabled = true;
          }
        }
      });
  }

  setTargetTemp(){
    if(!this.inputbusy) {
      this.targetTemp = Math.round((this.targetTemp) * 10) / 10;
      
      if(this.targetTemp == 30) {
        this.upenabled = false;
      }
      if(this.targetTemp > 30) {
        this.upenabled = false;
        this.presentTooHigh();
        this.targetTemp = 30;
      } 
      if(this.targetTemp < 30 && !this.lock) {
        this.upenabled = true;
      }
      if(this.targetTemp == 5) {
        this.downenabled = false;
      }
      if(this.targetTemp < 5) {
        this.downenabled = false; 
        this.presentTooLow();
        this.targetTemp = 5;
      } 
      if(this.targetTemp > 5 && !this.lock) {
        this.downenabled = true;
      }
      console.log("Up is enabled: " + this.upenabled + " and down is enabled: " + this.downenabled)
      this.thermoService.put("targetTemperature", {"target_temperature" : (this.targetTemp).toString()}).subscribe();
      console.log("go");
    }
  }

  tempUp(){
    if(this.targetTemp < 29.6) {
      this.targetTemp = Math.round((this.targetTemp + 0.1) * 10) / 10;
    } else {
      this.targetTemp = 30;
      this.presentTooHigh();
    }
    this.setTargetTemp();
  }

  tempDown(){
    if(this.targetTemp > 5.4) {
      this.targetTemp = Math.round((this.targetTemp - 0.1) * 10) / 10;
    } else {
      this.targetTemp = 5;
      this.presentTooLow();
    }
    this.setTargetTemp();
  }

  toggleLock(){
    console.log("toggled: " + this.lock);
    if(this.lock == true) {
      this.presentLocked();
      this.thermoService.setProgramState(false);
      this.inputenabled = false;
      this.upenabled = false;
      this.downenabled = false;
      this.setLockOn();
    } else {
      this.presentUnlocked();
      this.inputenabled = true;
      if(this.targetTemp < 30) {
        this.upenabled = true;
      } 
      if(this.targetTemp > 5) {
        this.downenabled = true;
      }
      this.thermoService.setProgramState(true);
      this.setLockOff();
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
      message: 'That temperature is too high. The maximum is 30°C.',
      duration: 4500,
      position: 'top'
    });
    toast.present();
  }

  presentTooLow() {
    console.log("Too Low!");
    let toast = this.toastCtrl.create({
        message: 'That temperature is too low. The minimum is 5°C.',
        duration: 4500,
        position: 'top'
      });
      toast.present();
  }

  presentLocked() {
    console.log("Schedule off!");
    let toast = this.toastCtrl.create({
        message: 'The temperature is now locked. Your schedule will NOT be followed.',
        duration: 5500,
        position: 'top'
      });
      toast.present();
  }

  presentUnlocked() {
    console.log("Schedule on!");
    let toast = this.toastCtrl.create({
        message: 'The temperature is now unlocked. Your schedule will be followed.',
        duration: 5500,
        position: 'top'
      });
      toast.present();
  }

  help() {
    console.log("clicked");
  }

  inInput() {
    this.inputbusy = true;
  }

  outInput() {
    this.inputbusy = false;
    this.setTargetTemp();
  }
}
