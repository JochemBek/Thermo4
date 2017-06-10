import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import * as $ from 'jquery';

@Injectable()
export class ThermoService{
    http: any;
    serverUrl: String; 
    attribute: String;
    jsonObject: string;
    
    Program: Program;
    
    startTime: string;
    endTime: string;
    onDay: string;
    startTimeNum: number;
    endTimeNum: number;

    ProgramState: boolean;
    MaxSwitches: number;
    Type: Type;
    Days: Days;

    constructor(http:Http){
        this.http = http; 
        this.serverUrl = 'http://wwwis.win.tue.nl/2id40-ws/004/';

        this.MaxSwitches = 5;
        this.Type = {Day: "day", Night: "night"};
        this.Days = {Monday: "Monday", Tuesday : "Tuesday", Wednesday : "Wednesday", Thursday : "Thursday", Friday : "Friday", Saturday : "Saturday", Sunday : "Sunday"};
        
        this.Program = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: []
        };

        //this.getWeekProgram();



        this.startTime = "5:00";
        this.endTime = "9:00";
        this.onDay = "Monday";
        this.addPeriod();
        
        this.startTime = "7:00";
        this.endTime = "8:00";
        this.onDay = "Monday";
        this.addPeriod();

        this.startTime = "4:00";
        this.endTime = "7:30";
        this.onDay = "Monday";
        this.addPeriod();

        this.startTime = "19:00";
        this.endTime = "20:30";
        this.onDay = "Monday";
        this.addPeriod();

        this.startTime = "10:00";
        this.endTime = "12:30";
        this.onDay = "Monday";
        this.addPeriod();

        this.startTime = "11:00";
        this.endTime = "15:00";
        this.onDay = "Monday";
        this.addPeriod();

        this.setWeekProgram();
    }

    get(attr){
        this.attribute = attr;
        return this.http.get(this.serverUrl + "" + this.attribute).map(res => res.json());
    }

    put(attr, jsonObj){
        this.attribute = attr;
        this.jsonObject = jsonObj;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.serverUrl+""+this.attribute, this.jsonObject, headers).map(res => res.json());
    }

    setProgramState(state) {
        this.ProgramState = state;
    }

    getWeekProgram() {
        this.get("weekProgram").subscribe(response => {
            for(var day in response.week_program.days) {
                for(var switches in response.week_program.days[day]){
                    for (var sw in response.week_program.days[day][switches]){
                    if(response.week_program.days[day][switches][sw].state == 'on'){
                        if(response.week_program.days[day][switches][sw].type == 'day') {
                        var temp1 = this.parseTime(response.week_program.days[day][switches][sw].time);
                        this.Program[day].push([temp1, 0]);
                        } else {
                        var temp2 = this.parseTime(response.week_program.days[day][switches][sw].time);
                        this.Program[day][this.Program[day].length-1][1] = temp2;
                        }
                    }
                    }
                }
            }
        });
    }

    addPeriod() {
        this.startTimeNum = this.parseTime(this.startTime);
        this.endTimeNum = this.parseTime(this.endTime);
        this.Program[this.onDay].push([this.startTimeNum, this.endTimeNum]);
        this.sortMergeProgram(this.onDay);
        this.setWeekProgram();
    }

    sortMergeProgram(day) {
        this.Program[day].sort( function(period1, period2) {
            if(period1[0] < period2[0]) {
                return -1;
            } else if (period1[0] > period2[0]) {
                return 1;
            } else {
                return 0;
            }
        });

        for(var i = 0; i < this.Program[day].length - 1; i++) {
            if(this.Program[day][String(i)][1] >= this.Program[day][String(i+1)][0]) {
                var start = this.Program[day][String(i)][0];
                var end;
                if(this.Program[day][String(i)][1] > this.Program[day][String(i+1)][1]) {
                    end = this.Program[day][String(i)][1];
                } else {
                    end = this.Program[day][String(i+1)][1];
                }
                this.Program[day].splice(String(i), 2);
                this.Program[day].push([start, end]);
                this.sortMergeProgram(day);
            }
        }
    }

    setWeekProgram() {
        var doc = document.implementation.createDocument(null, null, null); 
        var program = doc.createElement('week_program');
        program.setAttribute('state', this.ProgramState ? 'on' : 'off');

        for(var day in this.Program) {
            var dayel = doc.createElement('day');
            dayel.setAttribute('name', day);

            var daySwitches = [];
            var nightSwitches = [];

            var text, sw;
            for(var i = 0; i < this.Program[day].length; i++){
                daySwitches.push(this.toHourMin(this.Program[day][String(i)][0]));
                nightSwitches.push(this.toHourMin(this.Program[day][String(i)][1]));
            }

            for(var l = 0; l < this.MaxSwitches; l++){
                sw = doc.createElement('switch');
                sw.setAttribute('type', this.Type.Day);

                if(l < daySwitches.length) {
                    sw.setAttribute('state', 'on');
                    text = doc.createTextNode(daySwitches[l]);
                } else {
                    sw.setAttribute('state', 'off'); 
                    text = doc.createTextNode('00:00');
                }
                sw.appendChild(text);
                dayel.appendChild(sw);
            }

            for(var k = 0; k < this.MaxSwitches; k++){
                sw = doc.createElement('switch'); 
                sw.setAttribute('type', this.Type.Night);

                if(k < nightSwitches.length) {
                    sw.setAttribute('state', 'on');
                    text = doc.createTextNode(nightSwitches[k]);
                } else {
                    sw.setAttribute('state', 'off');
                    text = doc.createTextNode('00:00');
                }
                sw.appendChild(text);
                dayel.appendChild(sw);
            }
            program.appendChild(dayel);
        }
        doc.appendChild(program);
        console.log(doc);
        this.uploadData('weekProgram', (new XMLSerializer()).serializeToString(doc));
    }

    uploadData(address, xml) {
        $.ajax({
            type: "put",
            url: this.serverUrl + address,
            contentType: 'application/xml',
            data: xml,
            async: false
        });
    }

    parseTime(t) {
        return parseFloat(t.substr(0,2)) + parseFloat(t.substr(3,2))/60;
    }

    toHourMin(num){
        var hours = Math.floor(num);
        var minutes = Math.round((num % 1) * 60);
        var hoursString; 
        var minutesString;
        if(hours < 10) {
            hoursString = "0" + String(hours); 
        } else {
            hoursString = String(hours);
        }
        if(minutes < 10) {
            minutesString = "0" + String(minutes); 
        } else {
            minutesString = String(minutes);
        }
        var timeString = hoursString + ":" + minutesString;
        return timeString;
    }
}

interface Program {
  Monday: any[];
  Tuesday: any[];
  Wednesday: any[];
  Thursday: any[];
  Friday: any[];
  Saturday: any[];
  Sunday: any[];
}

interface Type {
    Day: string;
    Night: string;
}

interface Days {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
}