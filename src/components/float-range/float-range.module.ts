import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FloatRangeComponent } from './float-range';

@NgModule({
  declarations: [
    FloatRangeComponent,
  ],
  imports: [
    IonicPageModule.forChild(FloatRangeComponent),
  ],
  exports: [
    FloatRangeComponent
  ]
})
export class FloatRangeComponentModule {}
