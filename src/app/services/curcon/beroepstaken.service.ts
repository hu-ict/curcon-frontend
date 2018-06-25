import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { ErrorService } from '../../services/error.service'
import * as curconnamespace from '../../model/curconnamespace';
import * as myGlobals from '../../globals';


@Injectable()
export class BeroepstakenService {
  headers: HttpHeaders;
  ////options: RequestOptions

  constructor(private http: HttpClient) {
    console.log('BeroepstakenService Initialized...');
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'text/plain');
    this.headers.append('server','Apache-Coyote/1.1');


    ////this.options = new RequestOptions({ headers: this.headers });
  }

  getBeroepstaken(headersIn :HttpHeader): Observable<curconnamespace.CurconNameSpace.BeroepsTaakDto[]>{
    let requestOptions = {
      headers = headersIn
    };

    return this.http.get<curconnamespace.CurconNameSpace.BeroepsTaakDto[]>(myGlobals.baseUrl+'beroepstaken/', requestOptions)
    .pipe(
      tap(beroepstaak => console.log(beroepstaak))
      ,
      catchError(ErrorService.prototype.handleError<curconnamespace.CurconNameSpace.BeroepsTaakDto[]>("getBeroepstaken naam={beroesptaak.omschrijving}"))
    )
  }

  getBeroepstaakTypes(headersIn :HttpHeaders): Observable<curconnamespace.CurconNameSpace.BeroepsTaakDto[]> {
    // return this.http.get(myGlobals.baseUrl+'beroepstaken/types')
    //   .map(res => res.json());
    let requestOptions = {
      headers = headersIn,
    };

    return this.http.get<curconnamespace.CurconNameSpace.BeroepsTaakDto[]>(myGlobals.baseUrl+'beroepstaken/types', requestOptions)
      .pipe(tap(beroepstaak => console.log(beroepstaak)) ,
        catchError(ErrorService.prototype.handleError<curconnamespace.CurconNameSpace.BeroepsTaakDto[]>("getBeroepstaken naam={beroesptaak.omschrijving}"))
      )
  }

  getBeroepstakenByObject(obj, headersIn :HttpRequest) : Observable<curconnamespace.CurconNameSpace.BeroepsTaakDto[]> {
    let requestOptions = {
      headers = headersIn;
    };
    console.log("Beroepstaken object"+obj);
    return this.http.get<curconnamespace.CurconNameSpace.BeroepsTaakDto[]>
    (obj.href, requestOptions);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getBeroepstaakId(actid, archid, niv, headersIn : HttpHeaders): Observable<curconnamespace.CurconNameSpace.BeroepsTaakDto> {
    let requestOptions = {
      headers = headersIn,
    };

    return this.http.get<curconnamespace.CurconNameSpace.BeroepsTaakDto>
    (myGlobals.baseUrl+'beroepstaken/activiteiten/' + actid + '/architectuurlagen/' + archid + '/niveaus/' + niv, requestOptions)
      .pipe(
        tap(beroepstaak => console.log(beroepstaak))
        ,
        catchError(ErrorService.prototype.handleError<curconnamespace.CurconNameSpace.BeroepsTaakDto>
          ("getBeroepstaken naam={beroesptaak.omschrijving}"))
      )
  }
}
