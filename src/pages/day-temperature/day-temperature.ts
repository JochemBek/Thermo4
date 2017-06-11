import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThermoService } from '../../app/services/thermo.service';

/**
 * Generated class for the DayTemperaturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-day-temperature',
  templateUrl: 'day-temperature.html',
})
export class DayTemperaturePage {
  dayTemp: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private thermoService: ThermoService ) {
    this.getDayTemp();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DayTemperaturePage');
  }

  getDayTemp(){
      this.thermoService.get("dayTemperature").subscribe(response => {
        this.dayTemp = Number(response.day_temperature);
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

}
