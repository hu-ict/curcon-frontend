import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { ErrorService } from '../../services/error.service'
import * as curconnamespace from '../../model/curconnamespace';
import {AuthService} from '../../providers/auth.service';
import * as myGlobals from '../../globals';

@Injectable()
export class CursussenService {
	headers: HttpHeaders;
	//options: RequestOptions;
	// de httpsclient kan HttpHeaders
	organisationId: any;

constructor(private http: HttpClient) {
	console.log('Cursussen Service Initialized...');
	this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	this.headers.append('Access-Control-Allow-Origin', '*');
//	this.headers.append('Access-Control-Expose-Headers', 'content-disposition');
	//this.options = new RequestOptions({ headers: this.headers });
	this.organisationId = JSON.parse(localStorage.getItem('selectedOrganisatie'));
}

getCursussen() {
	var url = myGlobals.baseUrl+'organisaties/' + this.organisationId.id + '/cursussen';
	console.log("url "+url)
	return this.http.get<curconnamespace.CurconNameSpace.CursusLeerplanSchemaDto>(url,).pipe( tap( res => console.log(res)) );
}

getDataByHref(href) {
	return this.http.get<curconnamespace.CurconNameSpace.CursusLeerplanSchemaDto>(href,)
	.pipe( tap( res => console.log(res)) );
}

getCursussenByObject(obj) {
	console.log(obj.href);
	return this.http.get<curconnamespace.CurconNameSpace.CursusLeerplanSchemaDto>(obj.href,)
	.pipe( tap( res => console.log(res)) );
}

addBeroepstakenToCursus(cursusId, beroepstaak) {
	let newBeroepstaak = {'id': beroepstaak.id};
	return this.http.post<curconnamespace.CurconNameSpace.>(myGlobals.baseUrl+'cursussen/' + cursusId + '/beroepstaken', newBeroepstaak,)
	.pipe(catchError(this.handleError));
}

addProfessionalskillToCursus(cursusId, professionalskillId) {
	let newProfessionalskill = {'id': professionalskillId.id};
	return this.http.post<curconnamespace.CurconNameSpace.>(myGlobals.baseUrl+'cursussen/' + cursusId + '/professionalskills', newProfessionalskill)
	.pipe(catchError(this.handleError));
}

saveLeerdoel(cursusId, leerdoel) {
	if (leerdoel.id == null) {
		return this.http.post<curconnamespace.CurconNameSpace.>(myGlobals.baseUrl+'cursussen/' + cursusId + '/leerdoelen', leerdoel)
		.pipe(catchError(this.handleError));
	} else {
		var leerdoelId = leerdoel.id;
		delete leerdoel.id;
		console.log("leerdoelId "+leerdoelId);
		console.log("leerdoel "+leerdoel);
		return this.http.put<curconnamespace.CurconNameSpace.CursusLeerplanSchemaDto>(myGlobals.baseUrl+'leerdoelen/' + leerdoelId, leerdoel, httpOptions)
		.pipe(catchError(this.handleError));
	}
}

saveToets(cursusId, toets) {
	if (toets.id == null) {
		return this.http.post<curconnamespace.CurconNameSpace.>(myGlobals.baseUrl+'cursussen/' + cursusId + '/toetsen', toets)
		.pipe(catchError(this.handleError));
	} else {
		var toetsId = toets.id;
		delete toets.id;
		return this.http.put<curconnamespace.CurconNameSpace.>(myGlobals.baseUrl+'toetsen/' + toetsId, toets, )
		.pipe(catchError(this.handleError));
	}
}

deleteBeroepstaak(cursusId, beroepstaakId) {
	return this.http.delete(myGlobals.baseUrl+'cursussen/' + cursusId + '/beroepstaken/' + beroepstaakId)
	.pipe(catchError(this.handleError));
}

deleteProfessionalskill(cursusId, professionalskillId) {
	return this.http.delete(myGlobals.baseUrl+'cursussen/' + cursusId + '/professionalskills/' + professionalskillId)
	.pipe(catchError(this.handleError));
}

deleteLeerdoel(leerdoelId) {
	return this.http.delete(myGlobals.baseUrl+'leerdoelen/' + leerdoelId)
	.pipe(catchError(this.handleError));
}

updateCursus(id, form) {
	var headers = new HttpHeaders();
	headers.append('Content-Type', 'application/json');
	return this.http.put<curconnamespace.CurconNameSpace.>(myGlobals.baseUrl+'cursussen/' + id, form)
	.pipe(catchError(this.handleError));
}

addToetsElement(leerdoelid, form) {
	return this.http.post<curconnamespace.CurconNameSpace.>(myGlobals.baseUrl+'leerdoelen/' + leerdoelid + '/toetselementen', form)
	.pipe(catchError(this.handleError));
}

getToetsElementen(position, url) {
	return this.http.get<curconnamespace.CurconNameSpace.CursusLeerplanSchemaDto>(url)
	.map(res => [position, res.json()]);
}

deleteToets(bt2: any) {
	return this.http.delete(myGlobals.baseUrl+'toetsen/' + bt2)
	.pipe(catchError(this.handleError));
}

addCursus(cursus) {
	let url = myGlobals.baseUrl+'organisaties/' + this.organisationId.id + '/cursussen';
//	return this.http.post<curconnamespace.CurconNameSpace.>(url, cursus,).flatMap(
//		(res:Response) => {
//			console.log("headers");
//			console.log(res.headers);
//			return res;
//		}
//	).map(
//		(res:Response) => {
//			res.json();
//		}
//	).pipe(catchError(this.handleError));

	return this.http.post<curconnamespace.CurconNameSpace.>(url, cursus,).catchError(this.handleError)

}

editToetsElement(id, element) {
	return this.http.put<curconnamespace.CurconNameSpace.>(myGlobals.baseUrl+'toetselementen/' + id, element)
	.pipe(catchError(this.handleError));
}

deleteToetsElement(id) {
	return this.http.delete(myGlobals.baseUrl+'toetselementen/' + id)
	.pipe(catchError(this.handleError));
}

private extractData(res: Response) {
	let body = res.json();
	return body || {};
}

private handleError(error: any) {
	let errMsg = (error.message) ? error.message :
		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	console.error(errMsg);
	return Observable.throw(errMsg);
}


}
