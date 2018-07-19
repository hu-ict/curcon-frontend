import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import * as myGlobals from '../globals';

@Injectable()
export class ToetsProgrammaService {
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http){
        // console.log('ToetsProgrammaService Initialized...')
    }
    getCalculatedProfile(cohortId) {
        // console.log('ToetsProgrammaService.getCalculatedProfile called...')
		var url = myGlobals.baseUrl+'toetsprogrammas/' + cohortId + '/profiel';
		// console.log("url "+url)
        return this.http.get(url)
            .map(res => res.json());
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
