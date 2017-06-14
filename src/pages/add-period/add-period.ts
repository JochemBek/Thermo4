import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ThermoService } from '../../app/services/thermo.service';

/**
 * Generated class for the AddPeriodPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-period',
  templateUrl: 'add-period.html',
})
export class AddPeriodPage {
  day: string;
  mondayFull: boolean;
  tuesdayFull: boolean;
  wednesdayFull: boolean;
  thursdayFull: boolean;
  fridayFull: boolean;
  saturdayFull: boolean;
  sundayFull: boolean;

  MON_checked: any;
  TUE_checked: any;
  WED_checked: any;
  THU_checked: any;
  FRI_checked: any;
  SAT_checked: any;
  SUN_checked: any;
  days: string[];


  public event = {
    timeStarts: '07:43',
    timeEnds: '09:00'
  }

  thService: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private thermoService: ThermoService, public toastCtrl: ToastController) {
    console.log("There are " + thermoService.Program['Monday'].length + " on monday");
    this.initProgramLengths();
    this.getDay();
  }

  ionViewDidLoad() {
    this.initProgramLengths();
    this.getDay();
  }

  initProgramLengths() {
    this.days = [];
    if (this.thermoService.Program['Monday'].length>=5) { this.mondayFull=true; }else{  this.mondayFull=false;  }
    if (this.thermoService.Program['Tuesday'].length>=5) { this.tuesdayFull=true; }else{  this.tuesdayFull=false;  }
    if (this.thermoService.Program['Wednesday'].length>=5) { this.wednesdayFull=true; }else{  this.wednesdayFull=false;  }
    if (this.thermoService.Program['Thursday'].length>=5) { this.thursdayFull=true }else{  this.thursdayFull=false;  }
    if (this.thermoService.Program['Friday'].length>=5) { this.fridayFull=true; }else{  this.fridayFull=false;  }
    if (this.thermoService.Program['Saturday'].length>=5) { this.saturdayFull=true; }else{  this.saturdayFull=false;  }
    if (this.thermoService.Program['Sunday'].length>=5) { this.sundayFull=true; }else{  this.sundayFull=false;  }
  }

  getDay() {
    this.day = this.navParams.get('day');
    if(this.day == 'Monday') {
      this.MON_checked = true;
    } else if(this.day == 'Tuesday') {
      this.TUE_checked = true;
    } else if(this.day == 'Wednesday') {
      this.WED_checked = true;
    } else if(this.day == 'Thursday') {
      this.THU_checked = true;
    } else if(this.day == 'Friday') {
      this.FRI_checked = true;
    } else if(this.day == 'Saturday') {
      this.SAT_checked = true;
    } else if(this.day == 'Sunday') {
      this.SUN_checked = true;
    }
  }

  setPeriod(){
    if(this.parseTime(this.event.timeEnds) > this.parseTime(this.event.timeStarts)) {
      if (this.MON_checked==true) {
        this.days.push('Monday');
      }
      if (this.TUE_checked==true) {
        this.days.push('Tuesday');
      }
      if (this.WED_checked==true) {
        this.days.push('Wednesday');
      }
      if (this.THU_checked==true) {
        this.days.push('Thursday');
      }
      if (this.FRI_checked==true) {
        this.days.push('Friday');
      }
      if (this.SAT_checked==true) {
        this.days.push('Saturday');
      }
      if (this.SUN_checked==true) {
        this.days.push('Sunday');
      }
      this.thermoService.addPeriod_with_parameters(this.days, this.event.timeStarts, this.event.timeEnds);

      this.navCtrl.pop();
    } else {
      this.presentTimeDif();
    }    
  }

  presentTimeDif() {
    let toast = this.toastCtrl.create({
        message: 'Please fill in an end time that is later than the start time.',
        duration: 4500,
        position: 'top'
      });
      toast.present();
  }

  parseTime(t) {
      return parseFloat(t.substr(0,2)) + parseFloat(t.substr(3,2))/60;
  }
}
