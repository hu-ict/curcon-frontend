import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthNameSpace } from "../model/AuthNameSpace";
import { ErrorService } from "./error.service";
import { catchError, map, tap} from 'rxjs/operators';
// 'rxjs/add/operator/map' is replaced with HttpClient
import * as myGlobals from '../globals';

@Injectable({providedIn: 'root'})
export class ModuleService {
  constructor( private http: HttpClient) {}

  private log(message:string): void{
    // console.log( "moduleService armeluisdebugger: " + message);
  }
  getModule(id,headersIn :HttpHeaders){
    return this.http.get<AuthNameSpace.Rol>(myGlobals.baseUrl+'modules/'+id,{headers: headersIn})
  }

  getModules(headersIn :HttpHeaders): Observable<AuthNameSpace.Module[]> {
    return this.http.get<AuthNameSpace.Module[]>(myGlobals.baseUrl + 'modules',{headers: headersIn})
  }
  getModulesByObject(obj,headersIn :HttpHeaders) {
    // console.log(obj.href);
    return this.http.get<AuthNameSpace.Module[]>(obj.href,{headers: headersIn})
      .pipe( tap( res => // console.log(res)) );
  }

  //Creert een nieuwe Module
  addModule(module, headersIn:HttpHeaders )
  {
    let newModule: any= {}; //Object;
    newModule.name=module;
    // console.log(newModule);

  	headersIn.append("Access Control Allow Origin", "*");
  	return this.http.post<AuthNameSpace.ModulePostDto>( myGlobals.baseUrl+'modules/', newModule,{headers: headersIn})
  }
  updateModule(id, form, headersIn:HttpHeaders) {
    headersIn.append("Access Control Allow Origin", "*");
    return this.http.put<AuthNameSpace.Module>(myGlobals.baseUrl+'modules/' + id, form,{headers: headersIn})
  }
  deleteModule(id, headersIn:HttpHeaders) {
    headersIn.append("Access Control Allow Origin", "*");
  return this.http.delete(myGlobals.baseUrl+'modules/' + id,{headers: headersIn})
  }


  addFunctieToModule(moduleId, functie, headersIn:HttpHeaders) {
  	headersIn.append("Access Control Allow Origin", "*");
  	let newFunctie = {'id': functie.id};
  	return this.http.post(myGlobals.baseUrl+'modules/' + moduleId + '/functions', newFunctie,{headers: headersIn})
  }
  deleteFunctieFromModule(moduleId, functieId, headersIn:HttpHeaders) {
  	headersIn.append("Access Control Allow Origin", "*");
  	return this.http.delete(myGlobals.baseUrl+'modules/' + moduleId + '/functions/' + functieId,{headers: headersIn} )
  }


}
