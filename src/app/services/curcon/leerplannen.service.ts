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

    getLeerplannen() {
        return this.http.get<curconnamespace.CurconNameSpace.LeerplanSchemaDto>(myGlobals.baseUrl+'leerplannen/')
            .pipe( tap( res => console.log(res)) );
    }

    getLeerplannenProfiel(cohortId) {
        return this.http.get<curconnamespace.CurconNameSpace.LeerplanSchemaDto>(myGlobals.baseUrl+'leerplanschemas/' + cohortId + '/profiel')
            .pipe( tap( res => console.log(res)) );
    }

    getDataByHref(href) {
        return this.http.get<curconnamespace.CurconNameSpace.LeerplanSchemaDto>(href)
            .pipe( tap( res => console.log(res)) );
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
