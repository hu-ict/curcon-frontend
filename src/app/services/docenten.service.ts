import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpInterceptor  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Docent } from '../model/docent';
//import {Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { ErrorService } from "./error.service";
import { catchError, map, tap} from 'rxjs/operators';
import {AuthService} from '../providers/auth.service';
import * as myGlobals from '../globals';

@Injectable()
export class DocentenService {
    headers: Headers;
    // https://www.codeproject.com/Tips/1213737/Upgrade-to-Angular-and-HttpClient
    //options: HttpInterceptor; // In Progress: Globale HttpInterceptor
    organisationId: any;

    private log(message:string): void{
      console.log( "docentenService armeluisdebugger: " + message);
    }

    constructor(private http: HttpClient) {
        console.log('DocentenService Initialized...');
      localStorage.setItem("selectedOrganisatie",JSON.stringify({"id": "1"}));
      this.organisationId = JSON.parse(localStorage.getItem('selectedOrganisatie'));
    }

   //  generateHeader(){
   //      let headers = new HttpHeaders();
   //      headers  = headers.append('header-1', 'value-1');
   //      headers  = headers.append('header-2', 'value-2');
   //
   //     let params = new HttpParams();
   //     params = params.append('param-1', 'value-1');
   //     params = params.append('param-2', 'value-2');
   //     return headers;
   // }

    getDocent(headersIn :HttpHeaders ): Observable<Docent> {
let requestOptions = {
  headers: headersIn,
};
      //let headers = this.generateHeader();//TODO: uitzoeken of een mediator in de frontend van pas komt om auth headers op te vragen en te geven
      let url = `${myGlobals.baseUrl + "docenten/1/"}`;
      console.log("Ingetdoccenten");
      return this.http.get<Docent>(url, requestOptions  // {
  //    headers: headersIn
//    }
)    .pipe(
           tap(docenten => this.log(`fetched docenten id=${Docent.name}`), ), //["id"]}`), ),
          catchError(ErrorService.prototype.handleError<Docent>("getDocenten "))
         )
      //return null;
    }
    getDocenten(headersIn :HttpHeaders ): Observable<Docent[]> {
let requestOptions = {
  headers: headersIn,
};
      //let headers = this.generateHeader();//TODO: uitzoeken of een mediator in de frontend van pas komt om auth headers op te vragen en te geven
      let url = `${myGlobals.baseUrl + "organisaties/1/docenten"}`;
      console.log("Ingetdoccenten");
      return this.http.get<Docent[]>(url, requestOptions)  // {
  //    headers: headersIn
//    }
// )    .pipe(
//            tap(docenten => this.log(`fetched docenten id=${Docent.name}`), ), //["id"]}`), ),
//           catchError(ErrorService.prototype.handleError<Docent>("getDocenten "))
//          )
      //return null;
    }


//     getDocenten2(headersIn :HttpHeaders ): Observable<Docent> {
// let requestOptions = {
//  headers: headersIn,
// };
//      //let headers = this.generateHeader();//TODO: uitzoeken of een mediator in de frontend van pas komt om auth headers op te vragen en te geven
//      let url = `${myGlobals.baseUrl + "docenten/1/"}`;
//      console.log("Ingetdoccenten");
//      return this.http.get<Docent>(url, requestOptions
// )    .pipe(
//           tap(docenten => this.log(`fetched docenten id=${Docent.name}`), ), //["id"]}`), ),
//          catchError(ErrorService.prototype.handleError<Docent>("getDocenten id={docent.id}"))
//         )
//      //return null;
//    }

    // TODO: herzien voor hergebruik
    // getDocentenByObject(obj) {
    //     return this.http.get<Docent>(obj.href)
    //       .map(res => res.json());
    // }

    // TODO: herzien voor hergebruik
    // getDataByHref(href) {
    //     return this.http.get(href)
    //       .map(res => res.json());
    // }

    // TODO: herzien voor hergebruik
    //  private handleError(error: any) {
    //     let errMsg = (error.message) ? error.message :
    //         error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    //         console.error(errMsg);
    //     return Observable.throw(errMsg);
    // }

    // TODO: herzien voor hergebruik
	saveDocent(docentId, docentForm, headersIn :HttpHeaders){//:  Observable<Docent> {
  let requestOptions = {
    headers: headersIn,
  };
    //var headers = new Headers();
		//headers.append('Content-Type', 'application/json');
		if (docentId == null) {
			return this.http.post<Docent>(myGlobals.baseUrl + 'organisaties/1/docenten/', docentForm,requestOptions)
			// .pipe(catchError(this.handleError);
		} else {
			return this.http.put<Docent>(myGlobals.baseUrl + 'docenten/' + docentId, docentForm,requestOptions)
				// .pipe(catchError(this.handleError));
		}
	}
}
