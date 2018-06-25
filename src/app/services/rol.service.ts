import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Rol } from "../model/rol";
import { ErrorService } from "./error.service";
import { catchError, map, tap} from 'rxjs/operators';
// 'rxjs/add/operator/map' is replaced with HttpClient
import * as myGlobals from '../globals';

@Injectable()
export class RolService {
  constructor(
    private http: HttpClient
  ) {}

  private log(message:string): void{
    console.log( "rolService armeluisdebugger: " + message);
  }

  getRol(id, headersIn :httpReaders): Observable<Rol> {
    let requestOptions = {
      headers = headersIn,
    };

    let url = `${myGlobals.baseUrl + 'roles'}/${id}`;
    return this.http.get<Rol>(url, requestOptions)
    .pipe(
      tap(rol => this.log(`fetched rollen id=${rol.id}`)),
      catchError(ErrorService.prototype.handleError<Rol>('getRol id=${id}'))
    );
  }
  // TODO: registreer een bootstrap module nadat alle rollen zijn opgehaald
  getRollen(): Observable<Rol[]> {
    // Object.Prototype.function<Class[]>(Object.property);
    let url = `${myGlobals.baseUrl + 'roles'}`;
    return this.http.get<Rol[]>(url, requestOptions)
      .pipe(
        tap(rollen => this.log(`fetched rol id=${Rol["id"]}`)),
        catchError(ErrorService.prototype.handleError<Rol[]>("getRollen id={rol.id}"))
      );
  }
  //TODO: roep een bootstrap module aan nadat een rol is geselecteerd
  getModulesByRol(RolId, headersIn :HttpRequest): Observable<Rol[]> {
    let requestOption = {
      headers = headersIn,
    };

    return this.http.get<Rol[]>(`${myGlobals.baseUrl + 'roles'}/${RolId}/modules`, requestOptions)
      .pipe(
        tap(rollen => this.log(`fetched role id=${Rol["id"]}`)),
        catchError(ErrorService.prototype.handleError<Rol[]>("getModulesByRol id={rol.id}"))
    );
  }
}
