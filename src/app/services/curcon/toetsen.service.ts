import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { ErrorService } from '../../services/error.service'
import {AuthService} from '../../providers/auth.service';

import * as curconnamespace from '../../model/curconnamespace';
import * as myGlobals from '../../globals';

@Injectable()
export class ToetsenService {
  headers: Headers;
  constructor(private http: HttpClient) {
    console.log('ToetsenService Initialized...');
  }
//TODO kloppen de dto namen?

  getToetsen(headersIn: HttpHeaders ) {
    let requestOptions = {
    headers: headersIn,
    };
    let url =`${myGlobals.baseUrl+"toetsen/"}`;
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsToetsElementDto[]>(url, requestOptions)
      .pipe( tap( res => console.log(res)) );
  }

  getToetsenByObject(obj, headersIn: HttpHeaders) {
    return this.http.get<curconnamespace.CurconNameSpace.ToetsElementPutDto[]>(obj.href, {headers: headersIn})
      .pipe( tap( res => console.log(res)) );
  }

  getOsisrisResultaatTypes(headersIn: HttpHeaders) {
    let requestOptions = {
    headers: headersIn,
    };
    let url =`${myGlobals.baseUrl+"osirisresultaattypen/"}`;
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsToetsDto[]>(url, requestOptions)
      .pipe( tap( res => console.log(res)) );
  }

  getDataByHref(href) {
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsToetsDto>(href)
      .pipe( tap( res => console.log(res)) );
  }

	saveBeoordelingsElement(headersIn :HttpHeaders, toetsId, element) {
    let requestOptions = {
    headers: headersIn,
    };
		if (element.id == null) {
      let url =`${myGlobals.baseUrl+"toetsen/"+ toetsId + "/beoordelingselementen"}`;
			return this.http.post<curconnamespace.CurconNameSpace.BeoordelingsElementPostDto>(url, requestOptions, element)
			.pipe(catchError(this.handleError));
		} else {
      let url =`${myGlobals.baseUrl+"beoordelingselementen/" + elementId}`;
			var elementId = element.id;
			delete element.id;
			return this.http.put<curconnamespace.CurconNameSpace.ToetsMatrijsBeoordelingsElementDto>(url, requestOptions, element)
			.pipe(catchError(this.handleError));
		}
	}

	deleteBeoordelingselement(headersIn :HttpHeaders, elementId) {
    let requestOptions = {
    headers: headersIn,
    };
    let url =`${myGlobals.baseUrl+"beoordelingselementen/" + elementId}`;
		return this.http.delete(url, requestOptions)
			.pipe(catchError(this.handleError));
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

}
