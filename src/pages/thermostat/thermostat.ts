import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ThermoService } from '../../app/services/thermo.service';

@Component({
  selector: 'thermostat',
  templateUrl: 'thermostat.html'
})
export class ThermostatPage {
  // Here we declare our variables: note - not all standard types (e.g. floats) are supported 
  currentTemp: any;
  targetTempTen: number; // we use the target temp * 10 in this file, because the slider cannot go below step == 1
  targetTemp: number; // but when we pass the target temp along to thermoservice, we make sure we divide by 10, and set it to this variable
  locked: boolean;

  // This is the initializing function, which we pass other files for which we need the functions: this means that here you can use methods from ThermoService by calling thermoService.[function()]
  constructor(public navCtrl: NavController, private thermoService:ThermoService) {
    // This includes initializing variables
    this.locked = false; // Such as the lock 
    this.getCurrentTemperature(); // And the current temperature, which we get by calling another function. See the 'this.' everywhere? Ye, that's necessary: we're in a class.
    this.getTargetTemperature(); // etc. 
   
    // For the current Temperature, we need to frequently update it: this setInterval does that. That 'temp' is necessary, because 'this' is not the class anymore when you're inside the setInterval. 
    var temp = this;
    setInterval(function() {
      temp.getCurrentTemperature();
    }, 100);
  }

  // Gets the current temperature by calling the get() function of thermoService. It subscribes to wait for a response, and the response is a JSON, so we get the value by .[attribute] .
  getCurrentTemperature(){
      this.thermoService.get("currentTemperature").subscribe(response => {
        this.currentTemp = response.current_temperature;
      });
  }
 
  // Same story for target temp. See that we use the same function as before? That's because we give some attributes with wen callin get(), so these should be correct (check README on Canvas).
  getTargetTemperature(){ 
    this.thermoService.get("targetTemperature").subscribe(response => {
      this.targetTempTen = response.target_temperature *10;
    });
  }

  // This function calls the put function in thermoService, and passes the values that are needed to put in the API
  setTargetTemp(){
    this.targetTemp = this.targetTempTen/10;
    this.thermoService.put("targetTemperature", {"target_temperature" : (this.targetTemp).toString()}).subscribe();
  }

  // When pressed on the up button, increase the target temp
  tempUp(){
    if(this.targetTempTen < 296) {
      this.targetTempTen = this.targetTempTen + 5;
      this.setTargetTemp();
    } else {
      //Show message
    }
  }

  // When pressed on the down button, decrease the target temp
  tempDown(){
    if(this.targetTempTen > 55) {
      this.targetTempTen = this.targetTempTen - 5; 
      this.setTargetTemp();
    } else {
      //Show message
    }
  }

  // When pressed on the lock/unlock button
  toggleLock(){
    if(this.locked == true) {
      this.locked = false;
    } else {
      this.locked = true;
    }
  }
}
