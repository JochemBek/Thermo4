import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ThermoService } from '../../app/services/thermo.service';

@Component({
  selector: 'thermostat',
  templateUrl: 'thermostat.html'
})
export class ThermostatPage {
  currentTemp: number;
  targetTemp: number;
  locked: boolean;

  constructor(public navCtrl: NavController, private thermoService:ThermoService) {
    this.getLock(); 
    this.getCurrentTemperature(); 
    this.getTargetTemperature(); 
   
    var temp = this;
    setInterval(function() {
      temp.getCurrentTemperature();
    }, 100);
  }

  getLock() {
      this.thermoService.get("weekProgramState").subscribe(response => {
        if(response.week_program_state == "off") {
          this.locked = true; 
        } else {
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
      this.targetTemp = response.target_temperature;
    });
  }

  setTargetTemp(){
    this.thermoService.put("targetTemperature", {"target_temperature" : (this.targetTemp).toString()}).subscribe();
    console.log("go");
  }

  tempUp(){
    if(this.targetTemp < 29.6) {
      this.targetTemp = this.targetTemp + 0.5;
      this.setTargetTemp();
    } else {
      //Show message
    }
  }

  tempDown(){
    if(this.targetTemp > 5.5) {
      this.targetTemp = this.targetTemp - 0.5;
      this.setTargetTemp();
    } else {
      //Show message
    }
  }

  tempChanged(){
    if(this.targetTemp > 30) {
      this.targetTemp = 30;
    }
    if(this.targetTemp < 5) {
      this.targetTemp = 5;
    }
    this.setTargetTemp();
  }

  toggleLock(){
    if(this.locked == true) {
      this.locked = false;
      this.setLockOff();
    } else {
      this.locked = true;
      this.setLockOn();
    }
  }

  setLockOn(){
      this.thermoService.put("weekProgramState", {"week_program_state" : "off"}).subscribe();
  }

  setLockOff(){
      this.thermoService.put("weekProgramState", {"week_program_state" : "on"}).subscribe();
  }
}
