import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ThermoService{
    http: any;
    serverUrl: String; 
    attribute: String;
    jsonObject: string;
    temperature: number;
    maxTemperature: number;
    minTemperature: number;

    constructor(http:Http){
        this.http = http; 
        this.serverUrl = 'http://wwwis.win.tue.nl/2id40-ws/004/';
        this.maxTemperature = 30.0;
        this.minTemperature = 5.0;
    }

    /* This is the equivalent of the api.js file from the tutorial files on Canvas
     * Why not use that file? Well, ionic works with typescript, and that's not typescript
     * Nonetheless, functions can be mostly copied, I will work on getting that done asap
     */

    // When called by the pages, this function gets the needed attribute by doing a GET-request to the API: This function should not be changed (the syntax is easily fucked)
    get(attr){
        this.attribute = attr;
        return this.http.get(this.serverUrl + "" + this.attribute).map(res => res.json());
    }

    // When called by the pages, this function puts the needed attribute and value by doing a PUT-request to the API: This function should not be changed (the syntax is easily fucked)
    put(attr, jsonObj){
        this.attribute = attr;
        this.jsonObject = jsonObj;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.serverUrl+""+this.attribute, this.jsonObject, headers).map(res => res.json());
    }
}