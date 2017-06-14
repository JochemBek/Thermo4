import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular'; 
import { ThermoService } from '../../app/services/thermo.service';
import { AddPeriodPage } from '../add-period/add-period';

/**
 * Generated class for the DayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-day',
  templateUrl: 'day.html',
})
export class DayPage {
  day: string;
  periods: any[];
  periodsAdv: Period[];
  canAdd: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private thermoService: ThermoService, private alertCtrl: AlertController) {
    this.day = navParams.get('day');
  }

  ionViewWillEnter() {
    if(this.thermoService.Program[this.day].length < 5){
      this.canAdd = true;
    } else {
      this.canAdd = false;
    }
    this.periods = this.thermoService.getDayProgram(this.day);
    console.log(this.periods);
    this.periodsAdv = [];
    this.advPeriods();
  }

  advPeriods() {
    for(var period in this.periods){
      var sTime = this.parseTime(this.periods[period][0]);
      var eTime = this.parseTime(this.periods[period][1]);
      var difTime = eTime - sTime;
      var length; 
      if(difTime < 3) {
        length = 'Short';
      } else if (difTime < 10) {
        length = 'Long';
      } else {
        length = 'Very long'
      }

      this.periodsAdv.push({startTime: this.periods[period][0], endTime: this.periods[period][1], difTime: difTime, lengthT: length});
  
      console.log(this.periodsAdv[period]);
    }
  }

  clearDay(){
    let alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete all periods?',
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
            this.thermoService.clearDay(this.day);
            this.ionViewWillEnter();
          }
        }
      ]
    });
    alert.present();
  }

  clearPeriod(period){
    console.log(period);
    this.thermoService.clearPeriod(period, this.day);
    this.ionViewWillEnter();
  }

  goToAddPeriod() { 
    this.navCtrl.push(AddPeriodPage, {
      day: this.day
    });
  }

  parseTime(t) {
    return parseFloat(t.substr(0,2)) + parseFloat(t.substr(3,2))/60;
  }

}

interface Period {
  startTime: string;
  endTime: string;
  difTime: number;
  lengthT: string;
}
