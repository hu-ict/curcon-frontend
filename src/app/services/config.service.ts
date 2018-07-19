import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
//import { Observable } from 'rxjs';
import * as myGlobals from '../globals';

@Injectable()
export class RollenService {
	constructor(private http: Http) {
		// console.log('RollenService Initialized...');
	}

	// getRolById(id) {
	// 	return this.http
	// 	.get(myGlobals.baseUrl+'rol/' + id)
	// 	.map(res => res.json());
	// }
}
