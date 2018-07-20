import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { ErrorService } from '../../services/error.service'
import * as curconnamespace from '../../model/curconnamespace';
import {AuthService} from '../../providers/auth.service';
import * as myGlobals from '../../globals';

@Injectable()
export class ProfessionalskillsService {
	//headers: HttpHeaders;
	constructor(private http: HttpClient) {
		console.log('ProfessionalskillsService Initialized...');
		//this.headers = new HttpHeaders();

	}
//FIXME DELETE ME
	// handelprofskillzPromiseAf(){
	// 	AuthService.prototype.maakTokenHeadervoorCurcon().then()
	// }

	getProfessionalskills(headersIn: HttpHeaders) {
		let requestOptions = {
	headers: headersIn,
};
		return this.http.get<curconnamespace.CurconNameSpace.ProfessionalSkillDto[]>(myGlobals.baseUrl+'professionalskills/', requestOptions)
		
	}

	getProfessionalskillsByObject(obj, headersIn: HttpHeaders) {
		let requestOptions = {
	headers: headersIn,
};
		return this.http.get<curconnamespace.CurconNameSpace.ProfessionalSkillDto[]>(obj.href, requestOptions)

	}

	getProfessionalskillsTypes(headersIn: HttpHeaders) {
		let requestOptions = {
	headers: headersIn,
};
		return this.http.get<curconnamespace.CurconNameSpace.ProfessionalSkillTypesDto[]>(myGlobals.baseUrl+'professionalskills/types', requestOptions)

	}


	getProfessionalskillId(skillid, niv, headersIn: HttpHeaders) {
		let requestOptions = {
	headers: headersIn,
};
		return this.http.get<curconnamespace.CurconNameSpace.ProfessionalSkillDto>(myGlobals.baseUrl+'professionalskills/skill/' + skillid + '/niveaus/' + niv, requestOptions)

	}

	// tokenButtonPrint(){
  //     //let self = this; // dit is dubbelop
  //     this.authService.maakTokenHeadervoorCurcon().then(function(headers){
  //       self.docenten= [];
  //       self.docentenService.getDocenten(headers).subscribe(docent => {
  //         if (docent !=null){
  //             self.docenten.push(docent)
  //       }})
  //   });
  // }
}
