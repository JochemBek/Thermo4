import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DayTemperaturePage } from './day-temperature';

@NgModule({
  declarations: [
    DayTemperaturePage,
  ],
  imports: [
    IonicPageModule.forChild(DayTemperaturePage),
  ],
  exports: [
    DayTemperaturePage
  ]
})
export class DayTemperaturePageModule {}
