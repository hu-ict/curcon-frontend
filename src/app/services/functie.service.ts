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
  functieUrl : 'http://localhost:8080/autorisatie/restservices/function';
  i
  private log(message:string): void{
    console.log( "functieService armeluisdebugger: " + message);
  }

  getFunctie(id): Observable<Functie> {
    const url = `${this.functieUrl}/${id}`;
    return this.http.get<Functie>(this.functieUrl)
    .pipe(
      tap(functie => this.log(`fetched function id=${functie.id}`)),
      catchError(ErrorService.prototype.handleError<Functie>('getFunctie id=${id}'))
    );
  }

  getFuncties(): Observable<Functie[]> {
    // Object.Prototype.function<Class[]>(Object.property);
    return this.http.get<Functie[]>(this.functieUrl)
      .pipe(
        tap(functies => this.log(`fetched function id=${Functie["id"]}`)),
        catchError(ErrorService.prototype.handleError<Functie[]>('getFuncties id={id}'))
        // wordt Functie["id"] herkend door interpolated ng?
      );
  }
}
