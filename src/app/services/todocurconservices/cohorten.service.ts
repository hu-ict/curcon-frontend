import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import {Observable} from "rxjs";
import { AuthService } from '../../providers/auth.service';
import * as myGlobals from '../../globals';
import * as curconnamespace from '../../model/curconnamespace';

@Injectable()
export class CohortenService {
  headers : Promise<HttpHeaders>;

  constructor(private http: HttpClient) {
    console.log('CohortenService Initialized...');
    this.headers = AuthService.prototype.maakTokenHeadervoorCurcon();
  }

  getCohorten() {
    return this.http.get<curconnamespace.CurconNameSpace.CohortDto>(myGlobals.baseUrl+'cohorten/', { headers: this.headers })
      .pipe( tap( res => console.log(res)) );
  }

  getCohortenByObject(obj) {
    return this.http.get<curconnamespace.CurconNameSpace.CohortDto>(obj.href)
      .pipe( tap( res => console.log(res)) );
  }

  getDataByHref(href) {
    return this.http.get<curconnamespace.CurconNameSpace.CohortDto>(href)
      .pipe( tap( res => console.log(res)) );
  }

	saveCohort(opleidingId, cohort) {
		return this.http.post<curconnamespace.CurconNameSpace.>(myGlobals.baseUrl+'opleidingen/' + opleidingId + '/cohorten', cohort)
			.pipe(catchError(this.handleError));

	}

    addCursusToCohort(cohortId, cursus){
        return this.http.post<curconnamespace.CurconNameSpace.>(myGlobals.baseUrl+'cohorten/' + cohortId + '/cursussen', cursus)
            .pipe(catchError(this.handleError));
    }

    deleteCursus(cohortId, cursusId) {
        // Verwijdert een cursus uit een cohort (examenprogramma), cursus zelf wordt niet verwijderd.
        return this.http.delete(myGlobals.baseUrl+'cohorten/' + cohortId + '/cursussen/' + cursusId)
            .pipe(catchError(this.handleError));
    }

	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
