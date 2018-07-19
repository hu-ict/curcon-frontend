import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthNameSpace } from "../model/AuthNameSpace";
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
  getFunctie(id,headersIn :HttpHeaders){
    return this.http.get<AuthNameSpace.Functie>(myGlobals.baseUrl+'functions/'+id,{headers: headersIn})
  }

  getFuncties(headersIn :HttpHeaders) {
    return this.http.get<AuthNameSpace.Functie[]>(myGlobals.baseUrl+'functions/',{headers: headersIn})
      .pipe( tap( res => console.log(res)) );
  }

  getFunctiesByObject(obj,headersIn :HttpHeaders) {
    console.log(obj.href);
    return this.http.get<AuthNameSpace.Functie[]>(obj.href,{headers: headersIn})
      .pipe( tap( res => console.log(res)) );
  }

//WARNING Creert een nieuwe functie, deze staan hardcoded in de front en backend
  addFunctie(functie, headersIn:HttpHeaders )
  {

    let newFunctie: any= {}; //Object;
    newFunctie.name=functie;
    console.log(newFunctie);


  	headersIn.append("Access Control Allow Origin", "*");
  	return this.http.post<AuthNameSpace.FunctiePostDto>( myGlobals.baseUrl+'functions/', newFunctie,{headers: headersIn})
}
//WARNING update een functie, deze staan hardcoded in de front en backend
  updateFunctie(id, form, headersIn:HttpHeaders) {
  	headersIn.append("Access Control Allow Origin", "*");
  	return this.http.put<AuthNameSpace.Functie>(myGlobals.baseUrl+'functions/' + id, form,{headers: headersIn})
}
//WARNING delete een functie, deze staan hardcoded in de front en backend
//TODO Wil je een functie echt kunnen deleten?cursus,docent,opleiding kunnen nog niet verwijderd worden
deleteFunctie(id, headersIn:HttpHeaders) {
		headersIn.append("Access Control Allow Origin", "*");
	return this.http.delete(myGlobals.baseUrl+'functions/' + id,{headers: headersIn})
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
  getFunctiesByUser(email): Observable<AuthNameSpace.Functie[]> {
    return this.http.get<AuthNameSpace.Functie[]>(`${myGlobals.baseUrl + 'users'}/${email}/functions`)
      // .pipe(
      // tap(functies => this.log(`fetched function id=${Functie["id"]}`)),
      // catchError(ErrorService.prototype.handleError<Functie[]>("getFuncties id={functie.id}"))
      // // wordt Functie["id"] herkend door interpolated ng?
  // );
  }
}
