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
    //TODO Deze headers ook gebruiker en meegeven
		console.log('OrganisatieService Initialized...');
		this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		this.headers.append('Access-Control-Allow-Origin', '*');
		//this.options = new RequestOptions({ headers: this.headers });
	}

  getOrganisaties(headersIn :HttpHeaders ): Observable<curconnamespace.CurconNameSpace.OrganisatieDto[]> {
    let requestOptions = {
  headers: headersIn,
  };    requestOptions.headers.append( 'Content-Type', 'application/json' );
      requestOptions.headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<curconnamespace.CurconNameSpace.OrganisatieDto[]>(myGlobals.baseUrl+'organisaties/',requestOptions)
      
  }

  getOrganisatieById(id,headersIn :HttpHeaders ): Observable<curconnamespace.CurconNameSpace.OrganisatieDto> {
    let requestOptions = {
  headers: headersIn,
};    requestOptions.headers.append( 'Content-Type', 'application/json' );
    requestOptions.headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<curconnamespace.CurconNameSpace.OrganisatieDto>(myGlobals.baseUrl+'organisaties/' + id,requestOptions)
      
  }

  getOrganisatieByObject(obj,headersIn :HttpHeaders ): Observable<curconnamespace.CurconNameSpace.OrganisatieDto> {
    let requestOptions = {
      headers: headersIn,
    };
    requestOptions.headers.append( 'Content-Type', 'application/json' );
    requestOptions.headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<curconnamespace.CurconNameSpace.OrganisatieDto>(obj.href,requestOptions)
      
  }

  getDataByHref(href,headersIn :HttpHeaders ) {
    let requestOptions = {
  headers: headersIn,
};    requestOptions.headers.append( 'Content-Type', 'application/json' );
    requestOptions.headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<curconnamespace.CurconNameSpace.OrganisatieDto>(href, { headers : this.headers })
      
  }
}
