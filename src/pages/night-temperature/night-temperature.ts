import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
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
  upenabled: boolean;
  downenabled: boolean;
  inputbusy: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private thermoService: ThermoService, public toastCtrl: ToastController) {
    this.getNightTemp();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NightTemperaturePage');
  }

  getNightTemp(){  
      this.thermoService.get("nightTemperature").subscribe(response => {
        this.nightTemp = Number(response.night_temperature);
        if(this.nightTemp == 30) {
          this.upenabled = false;
        } else {
          this.upenabled = true;
        }
        if(this.nightTemp == 5) {
          this.downenabled = false;
        } else {
          this.downenabled = true;
        }
      });
  }

  setNightTemp(){
    if(!this.inputbusy) {
      if(this.nightTemp == 30) {
        this.upenabled = false; 
      }
      if(this.nightTemp > 30) {
        this.upenabled = false; 
        this.presentTooHigh();
        this.nightTemp = 30;
      } 
      if(this.nightTemp < 30) {
        this.upenabled = true;
      }
      if(this.nightTemp == 5) {
        this.downenabled = false;
      }
      if(this.nightTemp < 5) {
        this.downenabled = false;
        this.presentTooLow();
        this.nightTemp = 5;
      }
      if(this.nightTemp > 5) {
        this.downenabled = true;
      }
      this.thermoService.put("nightTemperature", {"night_temperature" : (this.nightTemp).toString()}).subscribe();
    }
  }

  nightTempUp(){
    if(this.nightTemp < 29.6) {
      this.nightTemp = Math.round((this.nightTemp + 0.5) * 10) / 10;
    } else {
      this.nightTemp = 30;
      this.presentTooHigh();
    }
    this.setNightTemp();
  }

  nightTempDown(){
    if(this.nightTemp > 5.4) {
      this.nightTemp = Math.round((this.nightTemp - 0.5) * 10) / 10;
    } else {
      this.nightTemp = 5;
      this.presentTooLow();
    }
    this.setNightTemp();
  }

  presentTooHigh() {
    console.log("Too High!");
    let toast = this.toastCtrl.create({
      message: 'That temperature is too high. The maximum is 30° C.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  presentTooLow() {
    console.log("Too Low!");
    let toast = this.toastCtrl.create({
        message: 'That temperature is too low. The minimum is 5° C.',
        duration: 5000,
        position: 'top'
      });
      toast.present();
  }

  inInput() {
    this.inputbusy = true;
  }

  outInput() {
    this.inputbusy = false;
    this.setNightTemp();
  }
}
