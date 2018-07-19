import { Injectable } from '@angular/core';

import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { ErrorService } from '../../services/error.service'
import * as curconnamespace from '../../model/curconnamespace';
import {AuthService} from '../../providers/auth.service';
import * as myGlobals from '../../globals';


@Injectable()
export class OpleidingenService {
    // headers: HttpHeaders;
	//options: RequestOptions;
	organisation: any;

	constructor(private http: HttpClient) {
		console.log('OpleidingenService Initialized...');
		// this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		// this.headers.append('Access-Control-Allow-Origin', '*');
		//this.options = new RequestOptions({ headers: this.headers });
		this.organisation = JSON.parse(localStorage.getItem('selectedOrganisatie'));
	}

	getOpleidingen(headersIn: HttpHeaders) {
    let requestOptions = {
  headers: headersIn,
};
requestOptions.headers.append( 'Content-Type', 'application/json' );
requestOptions.headers.append('Access-Control-Allow-Origin', '*');
		var url = myGlobals.baseUrl+'organisaties/' + this.organisation.id + '/opleidingsprofielen';
		console.log(url);
		return this.http.get<curconnamespace.CurconNameSpace.OpleidingsProfielDto[]>(url,requestOptions)
	}

	getDataByHref(href,headersIn: HttpHeaders) {
    let requestOptions = {
  headers: headersIn,
};
requestOptions.headers.append( 'Content-Type', 'application/json' );
requestOptions.headers.append('Access-Control-Allow-Origin', '*');
		return this.http.get<curconnamespace.CurconNameSpace.OpleidingsProfielDto>(href,requestOptions)
			
	}

	getOpleidingByObject(obj, headersIn: HttpHeaders) {
    let requestOptions = {
  headers: headersIn,
};
requestOptions.headers.append( 'Content-Type', 'application/json' );
requestOptions.headers.append('Access-Control-Allow-Origin', '*');
		return this.http.get<curconnamespace.CurconNameSpace.OpleidingsProfielDto[]>(obj.href,requestOptions)
	}

	saveOpleiding(opleiding, headersIn: HttpHeaders) {
    let requestOptions = {
  headers: headersIn,
};
requestOptions.headers.append( 'Content-Type', 'application/json' );
requestOptions.headers.append('Access-Control-Allow-Origin', '*');
		if (opleiding.id == null) {
			return this.http.post<curconnamespace.CurconNameSpace.OpleidingsProfielPostDto>(myGlobals.baseUrl+'organisaties/' + this.organisation.id + '/opleidingsprofielen', opleiding, requestOptions)
//				.subscribe(data => {
//					console.log(data.headers.get<curconnamespace.CurconNameSpace.>('content-location'));
//				});
				.pipe(
        tap(res => console.log(res+"OPleidingsprofielgepost"))
        ,catchError(this.handleError));
		} else {
      var opleidingId = opleiding.id;
      delete opleiding.id;
			var url = myGlobals.baseUrl+'opleidingsprofielen/'+ opleidingId;
			return this.http.put<curconnamespace.CurconNameSpace.OpleidingsProfielDto>(url, opleiding,requestOptions)
				.pipe(catchError(this.handleError));
		}
	}

	addBeroepstakenToOpleiding(opleidingId, beroepstaak, headersIn: HttpHeaders) {
    let requestOptions = {
  headers: headersIn,
};
requestOptions.headers.append( 'Content-Type', 'application/json' );
requestOptions.headers.append('Access-Control-Allow-Origin', '*');
		let newBeroepstaak = {'id': beroepstaak.id};
		return this.http.post<curconnamespace.CurconNameSpace.BeroepsTaakDto>(myGlobals.baseUrl + 'opleidingsprofielen/' + opleidingId + '/beroepstaken', newBeroepstaak,requestOptions)
			.pipe(catchError(this.handleError));
	}

	addProfessionalskillToOpleiding(opleidingId, professionalskillId, headersIn: HttpHeaders) {
    headersIn.append("Access Control Allow Origin", "*");
		let newProfessionalskill = {'id': professionalskillId.id};
		return this.http.post<curconnamespace.CurconNameSpace.ProfessionalSkillDto>(myGlobals.baseUrl + 'opleidingsprofielen/' + opleidingId + '/professionalskills', newProfessionalskill,{headers: headersIn}
    )
		.pipe(//catchError(this.handleError)
  );
	}

	deleteBeroepstaak(opleidingId, beroepstaakId, headersIn: HttpHeaders) {
    let requestOptions = {
  headers: headersIn,
};
requestOptions.headers.append( 'Content-Type', 'application/json' );
requestOptions.headers.append('Access-Control-Allow-Origin', '*');
		return this.http.delete(myGlobals.baseUrl + 'opleidingsprofielen/' + opleidingId + '/beroepstaken/' + beroepstaakId,requestOptions)
			.pipe(catchError(this.handleError));
	}

	deleteProfessionalskill(opleidingId, professionalskillId, headersIn: HttpHeaders) {
    let requestOptions = {
  headers: headersIn,
};
requestOptions.headers.append( 'Content-Type', 'application/json' );
requestOptions.headers.append('Access-Control-Allow-Origin', '*');
		return this.http.delete(myGlobals.baseUrl + 'opleidingsprofielen/' + opleidingId + '/professionalskills/' + professionalskillId, requestOptions)
			.pipe(catchError(this.handleError));
	}

	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

}
