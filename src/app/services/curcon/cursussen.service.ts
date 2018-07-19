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
	organisationId: any;

constructor(private http: HttpClient) {
	console.log('Cursussen Service Initialized...');
//	this.headers.append('Access-Control-Expose-Headers', 'content-disposition');
	this.organisationId = JSON.parse(localStorage.getItem('selectedOrganisatie'));
}

getCursussen(headersIn:HttpHeaders) {
		headersIn.append('Access-Control-Allow-Origin', '*');
	var url = myGlobals.baseUrl+'organisaties/' + this.organisationId.id + '/cursussen';
	console.log("url "+url)
	return this.http.get<curconnamespace.CurconNameSpace.CursusLeerplanSchemaDto[]>(url,{headers: headersIn}).pipe( tap( res => console.log(res)) );
}

getDataByHref(href, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	return this.http.get<curconnamespace.CurconNameSpace.CursusLeerplanSchemaDto>(href,{headers: headersIn})
	.pipe( tap( res => console.log(res)) );
}

getCursussenByObject(obj, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	console.log(obj.href);
	return this.http.get<curconnamespace.CurconNameSpace.CursusLeerplanSchemaDto[]>(obj.href,{headers: headersIn})
	.pipe( tap( res => console.log(res)) );
}


addBeroepstakenToCursus(cursusId, beroepstaak, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	let newBeroepstaak = {'id': beroepstaak.id};
	return this.http.post<curconnamespace.CurconNameSpace.BeroepsTaakDto>(myGlobals.baseUrl+'cursussen/' + cursusId + '/beroepstaken', newBeroepstaak,{headers: headersIn})
}

addProfessionalskillToCursus(cursusId, professionalskillId, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	let newProfessionalskill = {'id': professionalskillId.id};
	return this.http.post<curconnamespace.CurconNameSpace.ProfessionalSkillDto>(myGlobals.baseUrl+'cursussen/' + cursusId + '/professionalskills', newProfessionalskill,{headers: headersIn})
}

saveLeerdoel(cursusId, leerdoel, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	if (leerdoel.id == null) {
		return this.http.post<curconnamespace.CurconNameSpace.LeerdoelPostDto>(myGlobals.baseUrl+'cursussen/' + cursusId + '/leerdoelen', leerdoel,{headers: headersIn}
)
		.pipe(/* catchError werkt niet met een header erbij */
);
	} else {
		var leerdoelId = leerdoel.id;
		delete leerdoel.id;
		console.log("leerdoelId "+leerdoelId);
		console.log("leerdoel "+leerdoel);
		return this.http.put<curconnamespace.CurconNameSpace.LeerdoelPostDto>(myGlobals.baseUrl+'leerdoelen/' + leerdoelId, leerdoel,{headers: headersIn}
)
		.pipe(/* catchError werkt niet met een header erbij */
);
	}
}

saveToets(cursusId, toets, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	if (toets.id == null) {
		return this.http.post<curconnamespace.CurconNameSpace.ToetsPostDto>(myGlobals.baseUrl+'cursussen/' + cursusId + '/toetsen', toets,{headers: headersIn}
)
		.pipe(/* catchError werkt niet met een header erbij */
);
	} else {
		var toetsId = toets.id;
		delete toets.id;
		return this.http.put<curconnamespace.CurconNameSpace.ToetsPostDto>(myGlobals.baseUrl+'toetsen/' + toetsId, toets,{headers: headersIn}
 )
		.pipe(/* catchError werkt niet met een header erbij */
);
	}
}

deleteBeroepstaak(cursusId, beroepstaakId, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	return this.http.delete(myGlobals.baseUrl+'cursussen/' + cursusId + '/beroepstaken/' + beroepstaakId,{headers: headersIn} )
}

deleteProfessionalskill(cursusId, professionalskillId, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	return this.http.delete(myGlobals.baseUrl+'cursussen/' + cursusId + '/professionalskills/' + professionalskillId,{headers: headersIn})
	.pipe(/* catchError werkt niet met een header erbij */
);
}

deleteLeerdoel(leerdoelId, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	return this.http.delete(myGlobals.baseUrl+'leerdoelen/' + leerdoelId,{headers: headersIn})
	.pipe(/* catchError werkt niet met een header erbij */
);
}

updateCursus(id, form, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	return this.http.put<curconnamespace.CurconNameSpace.CursusLeerplanSchemaDto>(myGlobals.baseUrl+'cursussen/' + id, form,{headers: headersIn})
	.pipe(/* catchError werkt niet met een header erbij */
);
}

addToetsElement(leerdoelid, form, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	return this.http.post<curconnamespace.CurconNameSpace.CursusPostDto>(myGlobals.baseUrl+'leerdoelen/' + leerdoelid + '/toetselementen', form,{headers: headersIn})
	.pipe(/* catchError werkt niet met een header erbij */
);
}

getToetsElementen(position, url, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	return this.http.get<curconnamespace.CurconNameSpace.CursusLeerplanSchemaDto>(url,{headers: headersIn}).pipe(
    map(res => [position, res])
  )
}

deleteToets(bt2: any, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	return this.http.delete(myGlobals.baseUrl+'toetsen/' + bt2,{headers: headersIn})
	.pipe(/* catchError werkt niet met een header erbij */
);
}

addCursus(cursus, headersIn:HttpHeaders )
{
	headersIn.append("Access Control Allow Origin", "*");
	let url = myGlobals.baseUrl+'organisaties/' + this.organisationId.id + '/cursussen';
//	return this.http.post<curconnamespace.CurconNameSpace.CursusPostDto>(url, cursus,).flatMap(
//		(res:Response) => {
//			console.log("headers");
//			console.log(res.headers);
//			return res;
//		}
//	).map(
//		(res:Response) => {
//			res.json();
//		}
//	).pipe(/* catchError werkt niet met een header erbij */);
console.log(cursus+"prepostrequest");
	return this.http.post<curconnamespace.CurconNameSpace.CursusPostDto>(url, cursus,{headers: headersIn}).pipe(
		tap(cursus => console.log("Gepost?"+cursus)),
    /* catchError werkt niet met een header erbij */

  )

}

editToetsElement(id, element, headersIn:HttpHeaders) {
	headersIn.append("Access Control Allow Origin", "*");
	return this.http.put<curconnamespace.CurconNameSpace.ToetsElementPostDto>(myGlobals.baseUrl+'toetselementen/' + id, element,{headers: headersIn})
	.pipe(/* catchError werkt niet met een header erbij */
);
}

deleteToetsElement(id, headersIn:HttpHeaders) {
		headersIn.append("Access Control Allow Origin", "*");
	return this.http.delete(myGlobals.baseUrl+'toetselementen/' + id,{headers: headersIn})
	.pipe(/* catchError werkt niet met een header erbij */
);
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
