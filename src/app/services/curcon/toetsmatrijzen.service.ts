import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { ErrorService } from '../../services/error.service'
import {AuthService} from '../../providers/auth.service';

import * as curconnamespace from '../../model/curconnamespace';
import * as myGlobals from '../../globals';

@Injectable()
export class ToetsmatrijzenService {
  constructor(private http: HttpClient) {
    console.log('ToetsmatrijzenService Initialized...');
  }
//TODO kloppen de dtos ?
  getToetsmatrijzen(headersIn :HttpHeaders) {
  let requestOptions = {
  headers: headersIn,
  };
  let url =`${myGlobals.baseUrl+"toetsen/"}`;
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsToetsDto[]>(url, requestOptions)
      
  }

  getToetsmatrijzenByObject(obj) {
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsDto[]>(obj.href)
      
  }

  getToetsmatrijzenById(id, headersIn :HttpHeaders) {
    let requestOptions = {
    headers: headersIn,
    };
    let url =`${myGlobals.baseUrl+"toetsmatrijzen/"+id}`;
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsDto>(url, requestOptions)
      
  }

  getDataByHref(href) {
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsDto>(href)
      
  }
}
