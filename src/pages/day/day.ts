import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private thermoService: ThermoService) {
    this.day = navParams.get('day');
    this.periods = this.thermoService.getDayProgram(this.day);
    console.log(this.periods);
    this.periodsAdv = [];
    this.advPeriods();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DayPage');
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

  goToAddPeriod() { 
    this.navCtrl.push(AddPeriodPage);
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
