import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThermoService } from '../../app/services/thermo.service';

/**
 * Generated class for the NightTemperaturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-night-temperature',
  templateUrl: 'night-temperature.html',
})
export class NightTemperaturePage {
  nightTemp: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private thermoService: ThermoService) {
    this.getNightTemp();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NightTemperaturePage');
  }

  getNightTemp(){  
      this.thermoService.get("nightTemperature").subscribe(response => {
        this.nightTemp = Number(response.night_temperature);
      });
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

}
