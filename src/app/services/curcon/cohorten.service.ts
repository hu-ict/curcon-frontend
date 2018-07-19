import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import {Observable} from "rxjs";
import * as myGlobals from '../../globals';
import * as curconnamespace from '../../model/curconnamespace';

@Injectable()
export class CohortenService {

  constructor(private http: HttpClient) {
    // console.log('CohortenService Initialized...');
  }

  getCohorten(headersIn: HttpHeaders) {
    return this.http.get<curconnamespace.CurconNameSpace.CohortDto[]>(myGlobals.baseUrl+'cohorten/', { headers: headersIn })
      .pipe( tap( res => // console.log(res)) );
  }

  getCohortenByObject(obj, headersIn: HttpHeaders) {
    return this.http.get<curconnamespace.CurconNameSpace.CohortDto[]>(obj.href, { headers: headersIn })
      .pipe( tap( res => // console.log(res)) );
  }

  getDataByHref(href, headersIn: HttpHeaders) {
    return this.http.get<curconnamespace.CurconNameSpace.CohortDto>(href, { headers: headersIn })
      .pipe( tap( res => // console.log(res)) );
  }


	addCohort(opleidingId, cohort, headersIn: HttpHeaders) {
		return this.http.post<curconnamespace.CurconNameSpace.CohortPostDto>(myGlobals.baseUrl+'opleidingsprofielen/' + opleidingId + '/cohorten', cohort, { headers: headersIn })
			.pipe(catchError(this.handleError));

	}

    addCursusToCohort(cohortId, cursus, headersIn: HttpHeaders){
      let requestOptions = {
  headers: headersIn,
};
        return this.http.post<curconnamespace.CurconNameSpace.CohortPostDto>(myGlobals.baseUrl+'cohorten/' + cohortId + '/cursussen', cursus,requestOptions)
            .pipe(catchError(this.handleError));
    }

    deleteCursus(cohortId, cursusId, headersIn: HttpHeaders) {
        // Verwijdert een cursus uit een cohort (examenprogramma), cursus zelf wordt niet verwijderd.
        return this.http.delete(myGlobals.baseUrl+'cohorten/' + cohortId + '/cursussen/' + cursusId, { headers: headersIn })
            .pipe(catchError(this.handleError));
    }

	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
