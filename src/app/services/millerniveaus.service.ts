import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as myGlobals from '../globals';

@Injectable()
export class MillerNiveausService {
  constructor(private http: Http) {
    console.log('MillerNiveausService Initialized...');
  }

  getMillerNiveaus() {
    return this.http.get(myGlobals.baseUrl+'millerniveaus/')
      .map(res => res.json());
  }

  getMillerNiveausByObject(obj) {
    return this.http.get(obj.href)
      .map(res => res.json());
  }

}
