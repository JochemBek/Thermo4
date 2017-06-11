import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPeriodPage } from './add-period';

@NgModule({
  declarations: [
    AddPeriodPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPeriodPage),
  ],
  exports: [
    AddPeriodPage
  ]
})
export class AddPeriodPageModule {}
