import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NightTemperaturePage } from './night-temperature';

@NgModule({
  declarations: [
    NightTemperaturePage,
  ],
  imports: [
    IonicPageModule.forChild(NightTemperaturePage),
  ],
  exports: [
    NightTemperaturePage
  ]
})
export class NightTemperaturePageModule {}
