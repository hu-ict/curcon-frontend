import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from "../model/user";
import { ErrorService } from "./error.service";
import { catchError, map, tap} from 'rxjs/operators';
// 'rxjs/add/operator/map' is replaced with HttpClient
import * as myGlobals from '../globals';

@Injectable()
export class UserService {
  constructor(

    private http: HttpClient
  ) {
        console.log('UserService Initialized...');
  }

  private log(message:string): void{
    console.log( "userService armeluisdebugger: " + message);
  }
//
  getUser(id, headersIn :HttpHeaders ): Observable<User> {
    let requestOptions = {
      headers: headersIn,
    };

    let url = `${myGlobals.baseUrl + 'users'}/${id}`;
    return this.http.get<User>(url, requestOptions)
    .pipe(
      tap(user => this.log(`fetched function id=${user.username}`)),
      catchError(ErrorService.prototype.handleError<User>('getUser id=${id}'))
    );
  }
  //
  getUsers(headersIn :HttpHeaders ): Observable<User[]> {//g
    // Object.Prototype.function<Class[]>(Object.property);
    let url = `${myGlobals.baseUrl + 'users'}`;
    return this.http.get<User[]>(url, {
    headers: headersIn
  })
      .pipe(
        tap(users => this.log(`fetched username=${User["id"]}`)),
        catchError(ErrorService.prototype.handleError<User[]>("getUsers id={user.username}"))
        // wordt User["id"] herkend door interpolated ng?
      );
  }
}
