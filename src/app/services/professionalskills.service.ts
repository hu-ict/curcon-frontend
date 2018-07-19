import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as myGlobals from '../globals';

@Injectable()
export class ProfessionalskillsService {
	constructor(private http: Http) {
		// console.log('ProfessionalskillsService Initialized...');
	}

	getProfessionalskills() {
		return this.http.get(myGlobals.baseUrl+'professionalskills/')
		.map(res => res.json());
	}

	getProfessionalskillsByObject(obj) {
		return this.http.get(obj.href)
		.map(res => res.json());
	}

	getProfessionalskillsTypes() {
		return this.http.get(myGlobals.baseUrl+'professionalskills/types')
		.map(res => res.json());
	}


	getProfessionalskillId(skillid, niv) {
		return this.http.get(myGlobals.baseUrl+'professionalskills/skill/' + skillid + '/niveaus/' + niv)
		.map(res => res.json());
	}
}
