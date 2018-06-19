// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
//
// export class AppComponent {
//   title = 'seccurconapp';
// }
import {Component, OnInit} from '@angular/core';
import {OrganisatiesService} from "./services/curcon/organisaties.service";

@Component({
  // tslint:disable-next-line
	selector: 'body',
	template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
	allOrganisaties: Array<any>;
	selectedOrganisatie: string;

	ngOnInit(): void {
//    localStorage.setItem("")
	}

	constructor(private organisatieService: OrganisatiesService) {
	}
}
