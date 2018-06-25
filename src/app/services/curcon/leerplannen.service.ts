import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { ErrorService } from '../../services/error.service'
import * as curconnamespace from '../../model/curconnamespace';
import {AuthService} from '../../providers/auth.service';
import * as myGlobals from '../../globals';

@Injectable()
export class LeerplannenService {
    headers: HttpHeaders;
    //options: RequestOptions;

    constructor(private http: HttpClient){
        console.log('LeerplanService Initialized...')
    }

    getLeerplannen(headersIn :HttpHeaders) {
      let requestOptions = {
  headers: headersIn,
};

        return this.http.get<curconnamespace.CurconNameSpace.LeerplanSchemaDto[]>(myGlobals.baseUrl+'leerplannen/' ,requestOptions)
            .pipe( tap( res => console.log(res)) );
    }

    getLeerplannenProfiel(cohortId,headersIn :HttpHeaders) {
      let requestOptions = {
  headers: headersIn,
};

        return this.http.get<curconnamespace.CurconNameSpace.LeerplanSchemaDto[]>(myGlobals.baseUrl+'leerplanschemas/' + cohortId + '/profiel' ,requestOptions)
            .pipe( tap( res => console.log(res)) );
    }

    getDataByHref(href,headersIn :HttpHeaders) {
      let requestOptions = {
  headers: headersIn,
};

        return this.http.get<curconnamespace.CurconNameSpace.LeerplanSchemaDto>(href ,requestOptions)
            .pipe( tap( res => console.log(res)) );
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
