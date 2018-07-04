import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthNameSpace } from "../model/AuthNameSpace";
import { ErrorService } from "./error.service";
import { catchError, map, tap} from 'rxjs/operators';
// 'rxjs/add/operator/map' is replaced with HttpClient
import * as myGlobals from '../globals';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
    console.log('UserService Initialized...');
  }
  private log(message:string): void{
    console.log( "userService armeluisdebugger: " + message);
  }
//
  getUser(username, headersIn :HttpHeaders ): Observable<AuthNameSpace.User> {
    return this.http.get<AuthNameSpace.User>(myGlobals.baseUrl + 'users/'+username, {headers: headersIn})
  }
  //
  getUsers(headersIn :HttpHeaders ): Observable<AuthNameSpace.User[]> {
    return this.http.get<AuthNameSpace.User[]>(myGlobals.baseUrl + 'users/', {headers: headersIn})
  }

//Creert een nieuwe user
addUser(user, headersIn:HttpHeaders )
{
  headersIn.append("Access Control Allow Origin", "*");
  return this.http.post<AuthNameSpace.UserPostDto>( myGlobals.baseUrl+'users/', user,{headers: headersIn})
}
// updateUser (id, form, headersIn:HttpHeaders) { }
deleteUser(username, headersIn:HttpHeaders) {
  headersIn.append("Access Control Allow Origin", "*");
return this.http.delete(myGlobals.baseUrl+'users/' + username,{headers: headersIn})
}

///
  getRoleByUser(username, headersIn :HttpHeaders) {
    return this.http.get(myGlobals.baseUrl + 'users/' + username + '/role', {headers: headersIn});
  }

  updateRoleByUser(id, role, headersIn:HttpHeaders) {
    headersIn.append("Access Control Allow Origin", "*");
    let newRole = {'id': role.id};
    return this.http.put<AuthNameSpace.Rol>(myGlobals.baseUrl+'users/' + id+ '/role',newRole,{headers: headersIn})
  }

  getFunctionsByUser(username) {
    return this.http.get(myGlobals.baseUrl + 'users/' + username + '/functions');
  }

}
