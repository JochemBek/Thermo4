import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { SchedulePage } from '../schedule/schedule';
import { ThermostatPage } from '../thermostat/thermostat';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ThermostatPage;
  tab2Root = SchedulePage;
  tab3Root = AboutPage;

  constructor() {

  }
}
