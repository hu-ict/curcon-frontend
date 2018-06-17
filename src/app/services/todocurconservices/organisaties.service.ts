import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { ErrorService } from '../../services/error.service'
import {AuthService} from '../../providers/auth.service';

import * as curconnamespace from '../../model/curconnamespace';
import * as myGlobals from '../../globals';


@Injectable()
export class OrganisatiesService {
    headers: HttpHeaders;
	//options: RequestOptions;

	constructor(private http: HttpClient) {
		console.log('OrganisatieService Initialized...');
		this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		this.headers.append('Access-Control-Allow-Origin', '*');
		//this.options = new RequestOptions({ headers: this.headers });
	}

  getOrganisaties() {
    return this.http.get<curconnamespace.CurconNameSpace.OrganisatieDto>(myGlobals.baseUrl+'organisaties/',{ headers : this.headers })
      .pipe( tap( res => console.log(res)) );
  }

  getOrganisatieById(id) {
    return this.http.get<curconnamespace.CurconNameSpace.OrganisatieDto>(myGlobals.baseUrl+'organisaties/' + id,{ headers : this.headers })
      .pipe( tap( res => console.log(res)) );
  }

  getOrganisatieByObject(obj) {
    return this.http.get<curconnamespace.CurconNameSpace.OrganisatieDto>(obj.href,{ headers : this.headers })
      .pipe( tap( res => console.log(res)) );
  }

  getDataByHref(href) {
    return this.http.get<curconnamespace.CurconNameSpace.OrganisatieDto>(href, { headers : this.headers })
      .pipe( tap( res => console.log(res)) );
  }
}
