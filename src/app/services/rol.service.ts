import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthNameSpace } from "../model/AuthNameSpace";
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
  getRole(id,headersIn :HttpHeaders){
    return this.http.get<AuthNameSpace.Rol>(myGlobals.baseUrl+'roles/'+id,{headers: headersIn})
  }

  getRoles(headersIn :HttpHeaders): Observable<AuthNameSpace.Rol[]> {
    return this.http.get<AuthNameSpace.Rol[]>(myGlobals.baseUrl + 'roles',{headers: headersIn})
  }
  getRolesByObject(obj,headersIn :HttpHeaders) {
    console.log(obj.href);
    return this.http.get<AuthNameSpace.Rol[]>(obj.href,{headers: headersIn})
      
  }

  //Creert een nieuwe Role
  addRole(role, headersIn:HttpHeaders )
  {
    // let newUser:AuthNameSpace.UserPostDto = new AuthNameSpace.UserPostDto ;
    let newRole: any= {}; //Object;
    newRole.name=role;
    console.log(newRole);

    headersIn.append("Access Control Allow Origin", "*");
    return this.http.post<AuthNameSpace.RolPostDto>( myGlobals.baseUrl+'roles/', newRole,{headers: headersIn})
  }
  updateRole(id, form, headersIn:HttpHeaders) {
    headersIn.append("Access Control Allow Origin", "*");
    return this.http.put<AuthNameSpace.Rol>(myGlobals.baseUrl+'roles/' + id, form,{headers: headersIn})
  }
  deleteRole(id, headersIn:HttpHeaders) {
    headersIn.append("Access Control Allow Origin", "*");
  return this.http.delete(myGlobals.baseUrl+'roles/' + id,{headers: headersIn})
  }

  addModuleToRole(roleId, module, headersIn:HttpHeaders) {
  	headersIn.append("Access Control Allow Origin", "*");
  	let newModule = {'id': module.id};
  	return this.http.post(myGlobals.baseUrl+'roles/' + roleId + '/modules', newModule,{headers: headersIn})
  }
  deleteModuleFromRole(roleId, moduleId, headersIn:HttpHeaders) {
  	headersIn.append("Access Control Allow Origin", "*");
  	return this.http.delete(myGlobals.baseUrl+'roles/' + roleId + '/modules/' + moduleId,{headers: headersIn} )
  }

}
