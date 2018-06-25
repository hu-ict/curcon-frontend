import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { ErrorService } from '../../services/error.service'
import * as curconnamespace from '../../model/curconnamespace';
import {AuthService} from '../../providers/auth.service';
import * as myGlobals from '../../globals';

@Injectable()
export class MillerNiveausService {
  constructor(private http: HttpClient) {
    console.log('MillerNiveausService Initialized...');
  }

  getMillerNiveaus(headersIn :HttpHeaders) {
    let requestOptions = {
      headers : headersIn,
    };

    return this.http.get<curconnamespace.CurconNameSpace.MillerNiveauDto[]>(myGlobals.baseUrl+'millerniveaus/', requestOptions)
      .pipe( tap(res => console.log(res)));
  }

  getMillerNiveausByObject(obj, headersIn :HttpHeaders) {
    let requestOptions = {
      headers : headersIn,
    };

    return this.http.get<curconnamespace.CurconNameSpace.MillerNiveauDto[]>(obj.href, requestOptions)
      .pipe( tap( res => console.log(res)) );
  }

}
