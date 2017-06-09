import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  days: days[];

  constructor(public navCtrl: NavController) {
    this.days = [{
      day: 'Monday', 
      content: 'Maandag'
    },
    {
      day: 'Tuesday', 
      content: 'Dinsdag'
    },
    {
      day: 'Wednesday', 
      content: 'Woensdag'
    },
    {
      day: 'Thursday', 
      content: 'Donderdag'
    },
    {
      day: 'Friday', 
      content: 'Vrijdag'
    },
    {
      day: 'Saturday', 
      content: 'Zaterdag'
    },
    {
      day: 'Sunday', 
      content: 'Zondag'
    }]

  }
}

interface days {
  day: string;
  content: string; 
}