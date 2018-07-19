import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { ErrorService } from '../../services/error.service'
import * as curconnamespace from '../../model/curconnamespace';
import {AuthService} from '../../providers/auth.service';
import * as myGlobals from '../../globals';

@Injectable()
export class LeerdoelenService {
  constructor(private http: HttpClient) {
    console.log('LeerdoelenService Initialized...');
  }

  getLeerdoelen(headersIn :HttpHeaders ) {
  let requestOptions = {
  headers: headersIn,
};
    return this.http.get<curconnamespace.CurconNameSpace.LeerdoelOverzichtDto[]>(myGlobals.baseUrl+'leerdoelen/'
 ,requestOptions)
      .pipe( tap( res => console.log(res)) );
  }

  getLeerdoelenByObject(obj,headersIn :HttpHeaders) {
    let requestOptions = {
    headers: headersIn,
  };
    console.log(obj.href);
    return this.http.get<curconnamespace.CurconNameSpace.LeerdoelOverzichtDto[]>(obj.href
 ,requestOptions)
      .pipe( tap( res => console.log(res)) );
  }

 //  getDataByHref(href,headersIn :HttpHeaders ) {
 //    let requestOptions = {
 //    headers: headersIn,
 //  };
 //    return this.http.get<curconnamespace.CurconNameSpace.LeerdoelOverzichtDto>(href
 // ,requestOptions)
 //      .pipe( tap( res => console.log(res)) );
 //  }
}
