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

  getToetsmatrijzen() {
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsToetsDto>(myGlobals.baseUrl+'toetsen/')
      .pipe( tap( res => console.log(res)) );
  }

  getToetsmatrijzenByObject(obj) {
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsDto>(obj.href)
      .pipe( tap( res => console.log(res)) );
  }

  getToetsmatrijzenById(id) {
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsDto>(myGlobals.baseUrl+'toetsmatrijzen/' + id)
      .pipe( tap( res => console.log(res)) );
  }

  getDataByHref(href) {
    return this.http.get<curconnamespace.CurconNameSpace.ToetsMatrijsDto>(href)
      .pipe( tap( res => console.log(res)) );
  }
}
