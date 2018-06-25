import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Module } from "../model/module";
import { ErrorService } from "./error.service";
import { catchError, map, tap} from 'rxjs/operators';
// 'rxjs/add/operator/map' is replaced with HttpClient
import * as myGlobals from '../globals';

@Injectable({providedIn: 'root'})
export class ModuleService {
  constructor( private http: HttpClient) {}

  private log(message:string): void{
    console.log( "moduleService armeluisdebugger: " + message);
  }

  getModule(id): Observable<Module> {
    const url = `${myGlobals.baseUrl + 'modules'}/${id}`;
    return this.http.get<Module>(url)
    .pipe(
      tap(module => this.log(`fetched function id=${module.id}`)),
      catchError(ErrorService.prototype.handleError<Module>('getModule id=${module.id}'))
    );
  }
  /*  */
  getModules(headersIn :HttpHeaders): Observable<Module[]> {
    requestOptions = {
      headers = headersIn,
    };

    // Object.Prototype.function<Class[]>(Object.property);
    return this.http.get<Module[]>(myGlobals.baseUrl + 'modules', requestOptions)
      .pipe(
        tap(modules => this.log(`fetched function id=${Module["id"]}`)),
        catchError(ErrorService.prototype.handleError<Module[]>('getModules id={module.id}'))
        // wordt Module["id"] herkend door interpolated ng?
      );
  }
}
