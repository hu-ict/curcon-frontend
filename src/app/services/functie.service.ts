import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Functie, FunctiePostDto } from "../model/functie";
import { ErrorService } from "./error.service";
import { catchError, map, tap} from 'rxjs/operators';
// 'rxjs/add/operator/map' is replaced with HttpClient
import * as myGlobals from '../globals';

@Injectable()
export class FunctieService {
  constructor(
    private http: HttpClient
  ) {}

  private log(message:string): void{
    console.log( "functieService armeluisdebugger: " + message);
  }
//FIXME er is een hoop overbodige code nu uitgecomment, gebruik getfunctiesByObject voor module/rol,etc als je functies ophaalt/service aanroept
  // getFunctie(id): Observable<Functie> {
  //   let url = `${myGlobals.baseUrl + 'modules'}/${id}/functies`;
  //   return this.http.get<Functie>(url)
  //   .pipe(
  //     tap(functie => this.log(`fetched function id=${functie.id}`)),
  //     catchError(ErrorService.prototype.handleError<Functie>('getFunctie id=${id}'))
  //   );
  // }
  getFuncties(headersIn :HttpHeaders) {
    return this.http.get<Functie[]>(myGlobals.baseUrl+'functions/'
 ,{headers: headersIn})
      .pipe( tap( res => console.log(res)) );
  }

  getFunctiesByObject(obj,headersIn :HttpHeaders) {
    console.log(obj.href);
    return this.http.get<Functie[]>(obj.href,{headers: headersIn})
      .pipe( tap( res => console.log(res)) );
  }

//Creert een nieuwe functie
  addfunctie(functie, headersIn:HttpHeaders )
  {
  	headersIn.append("Access Control Allow Origin", "*");
  	return this.http.post<FunctiePostDto>( myGlobals.baseUrl+'functies/', functie,{headers: headersIn})
    //.pipe()
}

  updateFunctie(id, form, headersIn:HttpHeaders) {
  	headersIn.append("Access Control Allow Origin", "*");
  	return this.http.put<Functie>(myGlobals.baseUrl+'functies/' + id, form,{headers: headersIn})
  	.pipe(
  );
}
//TODO Wil je een functie echt kunnen deleten?cursus,docent,opleiding kunnen nog niet verwijderd worden
deleteFunctie(id, headersIn:HttpHeaders) {
		headersIn.append("Access Control Allow Origin", "*");
	return this.http.delete(myGlobals.baseUrl+'functies/' + id,{headers: headersIn})
}



  // getFuncties(moduleId): Observable<Functie[]> {//g
  //   // Object.Prototype.function<Class[]>(Object.property);
  //   let url = `${myGlobals.baseUrl + 'modules'}/${moduleId}/functions`;
  //   return this.http.get<Functie[]>(url)
  //     .pipe(
  //       tap(functies => this.log(`fetched function id=${Functie["id"]}`)),
  //       catchError(ErrorService.prototype.handleError<Functie[]>("getFuncties id={functie.id}"))
  //       // wordt Functie["id"] herkend door interpolated ng?
  //     );
  // }
  //
  // getFunctiesByModule(moduleId): Observable<Functie[]> {
  //   return this.http.get<Functie[]>(`${myGlobals.baseUrl + 'modules'}/${moduleId}/functions`)
  //     .pipe(
  //     tap(functies => this.log(`fetched function id=${Functie["id"]}`)),
  //     catchError(ErrorService.prototype.handleError<Functie[]>("getFuncties id={functie.id}"))
  //     // wordt Functie["id"] herkend door interpolated ng?
  //   );
  // }
  //
  
  //Deze functie staat apart omdat deze als enige geen headers nodig heeft.
  getFunctiesByUser(email): Observable<Functie[]> {
    return this.http.get<Functie[]>(`${myGlobals.baseUrl + 'users'}/${email}/functions`)
      // .pipe(
      // tap(functies => this.log(`fetched function id=${Functie["id"]}`)),
      // catchError(ErrorService.prototype.handleError<Functie[]>("getFuncties id={functie.id}"))
      // // wordt Functie["id"] herkend door interpolated ng?
  // );
  }
}
