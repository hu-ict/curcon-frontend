import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Functie } from "../model/functie";
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

  getFunctie(id): Observable<Functie> {
    let url = `${myGlobals.baseUrl + 'modules'}/${id}/functies`;
    return this.http.get<Functie>(url)
    .pipe(
      tap(functie => this.log(`fetched function id=${functie.id}`)),
      catchError(ErrorService.prototype.handleError<Functie>('getFunctie id=${id}'))
    );
  }
  //
  getFuncties(moduleId): Observable<Functie[]> {//g
    // Object.Prototype.function<Class[]>(Object.property);
    let url = `${myGlobals.baseUrl + 'modules'}/${moduleId}/functions`;
    return this.http.get<Functie[]>(url)
      .pipe(
        tap(functies => this.log(`fetched function id=${Functie["id"]}`)),
        catchError(ErrorService.prototype.handleError<Functie[]>("getFuncties id={functie.id}"))
        // wordt Functie["id"] herkend door interpolated ng?
      );
  }
  getFunctiesByModule(moduleId): Observable<Functie[]> {
    return this.http.get<Functie[]>(`${myGlobals.baseUrl + 'modules'}/${moduleId}/functions`)
      .pipe(
        tap(functies => this.log(`fetched function id=${Functie["id"]}`)),
        catchError(ErrorService.prototype.handleError<Functie[]>("getFuncties id={functie.id}"))
        // wordt Functie["id"] herkend door interpolated ng?
      );
    }

}
