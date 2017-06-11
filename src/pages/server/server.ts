import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThermoService } from '../../app/services/thermo.service';

/**
 * Generated class for the ServerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-server',
  templateUrl: 'server.html',
})
export class ServerPage {
  servers: string; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private thermoService: ThermoService) {
    this.servers = this.thermoService.getServer();
    console.log(this.servers);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServerPage');
  }

  setServer() {
    console.log(this.servers);
    this.thermoService.changeServer(this.servers);
  }
}
