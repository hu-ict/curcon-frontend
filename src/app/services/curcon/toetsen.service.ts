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
  constructor(private http: HttpClient) {
    console.log('ToetsenService Initialized...');
  }

  getToetsen() {
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsToetsElementDto>('myGlobals.baseUrl'+'toetsen/')
      .pipe( tap( res => console.log(res)) );
  }

  getToetsenByObject(obj) {
    return this.http.get<curconnamespace.CurconNameSpace.ToetsElementPutDto>(obj.href)
      .pipe( tap( res => console.log(res)) );
  }

  getOsisrisResultaatTypes() {
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsToetsDto>('myGlobals.baseUrl'+'osirisresultaattypen/')
      .pipe( tap( res => console.log(res)) );
  }

  getDataByHref(href) {
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsToetsDto>(href)
      .pipe( tap( res => console.log(res)) );
  }

	saveBeoordelingsElement(toetsId, element) {
		if (element.id == null) {
			return this.http.post<curconnamespace.CurconNameSpace.BeoordelingsElementPostDto>(myGlobals.baseUrl+'toetsen/' + toetsId + '/beoordelingselementen', element)
			.pipe(catchError(this.handleError));
		} else {
			var elementId = element.id;
			delete element.id;
			return this.http.put<curconnamespace.CurconNameSpace.ToetsMatrijsBeoordelingsElementDto>(myGlobals.baseUrl+'beoordelingselementen/' + elementId, element)
			.pipe(catchError(this.handleError));
		}
	}

	deleteBeoordelingselement(elementid) {
		return this.http.delete(myGlobals.baseUrl+'beoordelingselementen/' + elementid)
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
