import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpInterceptor  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as curconnamespace from '../../model/curconnamespace';
//import {Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { ErrorService } from "../error.service";
import { catchError, map, tap} from 'rxjs/operators';
import {AuthService} from '../../providers/auth.service';
import * as myGlobals from '../../globals';


@Injectable()
export class BloomniveausService {
  constructor(private http: HttpClient) {
    console.log('BloomniveausService Initialized...');
  }

  getBloomniveaus(headersIn :HttpHeaders) {
    let requestOptions = {
      headers = headersIn
    };
    
    return this.http.get<curconnamespace.CurconNameSpace.BloomNiveauDto[]>(myGlobals.baseUrl+'bloomniveaus/', requestOptions)
      .pipe( tap( res => console.log(res)) );
  }

  getBloomniveausByObject(obj, headersIn :HttpHeaders) {
    let requestOptions = {
      headers = headersIn
    };

    return this.http.get<curconnamespace.CurconNameSpace.BloomNiveauDto[]>(obj.href, requestOptions)
      .pipe( tap( res => console.log(res)) );
  }

}
