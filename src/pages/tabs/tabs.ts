import { Component } from '@angular/core';

import { ServerPage } from '../server/server';
import { SchedulePage } from '../schedule/schedule';
import { ThermostatPage } from '../thermostat/thermostat';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ThermostatPage;
  tab2Root = SchedulePage;
  tab3Root = ServerPage;

  constructor() {

  }
}
