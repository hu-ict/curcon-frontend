import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { ErrorService } from '../../services/error.service'
import * as curconnamespace from '../../model/curconnamespace';
import {AuthService} from '../../providers/auth.service';
import * as myGlobals from '../../globals';


@Injectable()
export class OpleidingenService {
    headers: HttpHeaders;
	//options: RequestOptions;
	organisation: any;

	constructor(private http: HttpClient) {
		console.log('OpleidingenService Initialized...');
		this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		this.headers.append('Access-Control-Allow-Origin', '*');
		//this.options = new RequestOptions({ headers: this.headers });
		this.organisation = JSON.parse(localStorage.getItem('selectedOrganisatie'));
	}

	getOpleidingen(headersIn: HttpHeaders) {
		var url = myGlobals.baseUrl+'organisaties/' + this.organisation.id + '/opleidingsprofielen';
		console.log(url);
		return this.http.get<curconnamespace.CurconNameSpace.OpleidingsProfielDto[]>(url,{ headers : this.headers }).pipe( tap( res => console.log(res)) );
	}

	getDataByHref(href) {
		return this.http.get<curconnamespace.CurconNameSpace.OpleidingsProfielDto>(href,{ headers : this.headers })
			.pipe( tap( res => console.log(res)) );
	}

	getOpleidingByObject(obj, headersIn: HttpHeaders) {
		return this.http.get<curconnamespace.CurconNameSpace.OpleidingsProfielDto[]>(obj.href,{
      headers: headersIn
    }).pipe( tap( res => console.log(res)) );
	}

	saveOpleiding(opleiding, headersIn: HttpHeaders) {
		if (opleiding.id == null) {
			return this.http.post<curconnamespace.CurconNameSpace.OpleidingsProfielPostDto>(myGlobals.baseUrl+'organisaties/' + this.organisation.id + '/opleidingsprofielen', opleiding, {headers: headersIn})
//				.subscribe(data => {
//					console.log(data.headers.get<curconnamespace.CurconNameSpace.>('content-location'));
//				});
				.pipe(
        tap(res => console.log(res+"OPleidingsprofielgepost"))
        ,catchError(this.handleError));
		} else {
			var url = myGlobals.baseUrl+'opleidingsprofielen/'+ opleidingId;
			console.log(url);
			var opleidingId = opleiding.id;
			delete opleiding.id;
			return this.http.put<curconnamespace.CurconNameSpace.OpleidingsProfielDto>(url, opleiding, {
        headers: headersIn
      })
				.pipe(catchError(this.handleError));
		}
	}

	addBeroepstakenToOpleiding(opleidingId, beroepstaak, headersIn: HttpHeaders) {
		let newBeroepstaak = {'id': beroepstaak.id};
		return this.http.post<curconnamespace.CurconNameSpace.OpleidingsProfielPostDto>(myGlobals.baseUrl + 'opleidingsprofielen/' + opleidingId + '/beroepstaken', newBeroepstaak, {
      headers: headersIn
    })
			.pipe(catchError(this.handleError));
	}

	addProfessionalskillToOpleiding(opleidingId, professionalskillId, headersIn: HttpHeaders) {
		let newProfessionalskill = {'id': professionalskillId.id};
		return this.http.post<curconnamespace.CurconNameSpace.OpleidingsProfielPostDto>(myGlobals.baseUrl + 'opleidingsprofielen/' + opleidingId + '/professionalskills', newProfessionalskill, {
      headers: headersIn
    })
		.pipe(catchError(this.handleError));
	}

	deleteBeroepstaak(opleidingId, beroepstaakId, headersIn: HttpHeaders) {
		return this.http.delete(myGlobals.baseUrl + 'opleidingsprofielen/' + opleidingId + '/beroepstaken/' + beroepstaakId, {
      headers: headersIn
    })
			.pipe(catchError(this.handleError));
	}

	deleteProfessionalskill(opleidingId, professionalskillId, headersIn: HttpHeaders) {
		return this.http.delete(myGlobals.baseUrl + 'opleidingsprofielen/' + opleidingId + '/professionalskills/' + professionalskillId, {
      headers: headersIn
    })
			.pipe(catchError(this.handleError));
	}

	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

}
