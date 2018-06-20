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
	headers: HttpHeaders;
	constructor(private http: HttpClient) {
		console.log('ProfessionalskillsService Initialized...');
		this.headers = new HttpHeaders();

	}
//FIXME DELETE ME
	// handelprofskillzPromiseAf(){
	// 	AuthService.prototype.maakTokenHeadervoorCurcon().then()
	// }

	getProfessionalskills() {
		return this.http.get<curconnamespace.CurconNameSpace.ProfessionalSkillDto[]>(myGlobals.baseUrl+'professionalskills/', { headers : this.headers })
		.pipe( tap( res => console.log(res)) );
	}

	getProfessionalskillsByObject(obj) {
		return this.http.get<curconnamespace.CurconNameSpace.ProfessionalSkillDto[]>(obj.href, { headers : this.headers })
		.pipe( tap( res => console.log(res)) );
	}

	getProfessionalskillsTypes() {
		return this.http.get<curconnamespace.CurconNameSpace.ProfessionalSkillTypesDto[]>(myGlobals.baseUrl+'professionalskills/types', { headers : this.headers })
		.pipe( tap( res => console.log(res)) );
	}


	getProfessionalskillId(skillid, niv) {
		return this.http.get<curconnamespace.CurconNameSpace.ProfessionalSkillDto>(myGlobals.baseUrl+'professionalskills/skill/' + skillid + '/niveaus/' + niv, { headers : this.headers })
		.pipe( tap( res => console.log(res)) );
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
