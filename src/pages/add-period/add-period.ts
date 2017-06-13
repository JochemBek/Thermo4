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

  MON: string;
  TUE: string;
  WED: string;
  THU: string;
  FRI: string;
  SAT: string;
  SUN: string;

  MON_checked: any;
  TUE_checked: any;
  WED_checked: any;
  THU_checked: any;
  FRI_checked: any;
  SAT_checked: any;
  SUN_checked: any;


  public event = {
    timeStarts: '07:43',
    timeEnds: '09:00'
  }

  thService: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private thermoService: ThermoService) {

    if (thermoService.Program['Monday'].length>=5) { this.MON='true'; }else{  this.MON='false';  }
    if (thermoService.Program['Tuesday'].length>=5) { this.TUE='true'; }else{  this.TUE='false';  }
    if (thermoService.Program['Wednesday'].length>=5) { this.WED='true'; }else{  this.WED='false';  }
    if (thermoService.Program['Thursday'].length>=5) { this.THU='true'; }else{  this.THU='false';  }
    if (thermoService.Program['Friday'].length>=5) { this.FRI='true'; }else{  this.FRI='false';  }
    if (thermoService.Program['Saturday'].length>=5) { this.SAT='true'; }else{  this.SAT='false';  }
    if (thermoService.Program['Sunday'].length>=5) { this.SUN='true'; }else{  this.SUN='false';  }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPeriodPage');
  }


  goToAddPeriod(){
    //console.log(this.event.timeEnds)
    console.log(this.MON_checked)

    if (this.MON_checked==true) {
      this.thermoService.addPeriod_with_parameters("Monday", this.event.timeStarts, this.event.timeEnds);
    }
    if (this.TUE_checked==true) {
      this.thermoService.addPeriod_with_parameters("Monday", this.event.timeStarts, this.event.timeEnds);
    }
    if (this.WED_checked==true) {
      this.thermoService.addPeriod_with_parameters("Monday", this.event.timeStarts, this.event.timeEnds);
    }
    if (this.THU_checked==true) {
      this.thermoService.addPeriod_with_parameters("Monday", this.event.timeStarts, this.event.timeEnds);
    }
    if (this.FRI_checked==true) {
      this.thermoService.addPeriod_with_parameters("Monday", this.event.timeStarts, this.event.timeEnds);
    }
    if (this.SAT_checked==true) {
      this.thermoService.addPeriod_with_parameters("Monday", this.event.timeStarts, this.event.timeEnds);
    }
    if (this.SUN_checked==true) {
      this.thermoService.addPeriod_with_parameters("Monday", this.event.timeStarts, this.event.timeEnds);
    }



  }



}
