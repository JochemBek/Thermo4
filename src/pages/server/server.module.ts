import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServerPage } from './server';

@NgModule({
  declarations: [
    ServerPage,
  ],
  imports: [
    IonicPageModule.forChild(ServerPage),
  ],
  exports: [
    ServerPage
  ]
})
export class ServerPageModule {}
