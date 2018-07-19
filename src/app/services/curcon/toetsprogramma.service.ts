import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpInterceptor  } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import {Observable} from "rxjs";
import * as myGlobals from '../../globals';

import * as curconnamespace from '../../model/curconnamespace';

@Injectable()
export class ToetsProgrammaService {
    headers: HttpHeaders;
    ////options: RequestOptions;

    constructor(private http: HttpClient){
        // console.log('ToetsProgrammaService Initialized...')
    }
    getCalculatedProfile(headersIn :HttpHeaders, cohortId) : Observable< curconnamespace.CurconNameSpace.CohortDto> {
        // console.log('ToetsProgrammaService.getCalculatedProfile called...')
        let requestOptions = {
        headers: headersIn,
        };
        let url =`${myGlobals.baseUrl+'toetsprogrammas/' + cohortId + '/profiel'}`;
		      // console.log("url "+url)
        return this.http.get<curconnamespace.CurconNameSpace.CohortDto>(url, requestOptions)
            .pipe(
              tap( cohort => // console.log(cohort))
             );
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
