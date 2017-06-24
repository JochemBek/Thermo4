import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular'; 
import { ThermoService } from '../../app/services/thermo.service';
import { AddPeriodPage } from '../add-period/add-period';
import { ToastController } from 'ionic-angular';

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
  periodsAdv_old: Period[];
  canAdd: boolean;
  canClear: boolean;

  startTime_temporal: string;
  endTime_temporal: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private thermoService: ThermoService, private alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.day = navParams.get('day');
  }

  ionViewWillEnter() {
    if(this.thermoService.Program[this.day].length < 5){
      this.canAdd = true;
    } else {
      this.canAdd = false;
    }
    if(this.thermoService.Program[this.day].length == 0){
      this.canClear = false;
    } else {
      this.canClear = true;
    }
    this.periods = this.thermoService.getDayProgram(this.day);
    console.log(this.periods);
    this.periodsAdv = [];
    this.advPeriods();
    this.periodsAdv_old = this.periodsAdv;
  }

  advPeriods() {
    for(var period in this.periods){
      var sTime = this.parseTime(this.periods[period][0]);
      var eTime = this.parseTime(this.periods[period][1]);
      var difTime = Math.round((eTime - sTime) * 10) / 10;
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

  updateCardTime(){
    console.log("Here");
    console.log(this.periodsAdv);
    // First we check if the new  dates are valid dates
    for(var i = 0; i < this.periodsAdv.length; i++){
      if(this.periodsAdv[i].endTime<=this.periodsAdv[i].startTime){
        console.log("ERROR!! endTime<startTime");
        this.periodsAdv = this.periodsAdv_old;
        this.ionViewWillEnter();
        this.errorTimeChange();
      }
    }
    this.thermoService.clearDay(this.day);
    for(var i = 0; i < this.periodsAdv.length; i++){
       this.thermoService.addPeriod_with_parameters([this.day], this.periodsAdv[i].startTime , this.periodsAdv[i].endTime);
    }
    this.periodsAdv_old = this.periodsAdv;
    this.ionViewWillEnter();
  }


  errorTimeChange() {
    let toast = this.toastCtrl.create({
        message: 'Please fill in an end time that is later than the start time.',
        duration: 4500,
        position: 'top'
      });
      toast.present();
  }


}

interface Period {
  startTime: string;
  endTime: string;
  difTime: number;
  lengthT: string;
}
