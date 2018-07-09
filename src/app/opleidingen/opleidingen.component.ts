import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import {Router} from '@angular/router';
import {OrderByPipe} from './orderby.pipe';
import {CursussenService} from '../services/curcon/cursussen.service';
import {BeroepstakenService} from '../services/curcon/beroepstaken.service';
import {ProfessionalskillsService} from '../services/curcon/professionalskills.service';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {OpleidingenService} from '../services/curcon/opleidingen.service';

import {CohortenService} from '../services/curcon/cohorten.service';
import {LeerplannenService} from '../services/curcon/leerplannen.service';
import {ToetsProgrammaService} from '../services/curcon/toetsprogramma.service';

import {BtMatrixComponent} from '../bt-overzicht/bt-matrix.component';
import {BtCalculatedComponent} from '../bt-calculated/bt-calculated.component';
import {PsOverzichtComponent} from '../ps-overzicht/ps-overzicht.component';
import {BoksOverzichtComponent} from '../boks-overzicht/boks-overzicht.component';

import {AuthService} from '../providers/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {FunctieService} from '../services/functie.service';

@Component({
	templateUrl: 'opleidingen.component.html',
  styleUrls: [ './opleidingen.component.css' ]
})

export class OpleidingenComponent implements OnInit {
	opleidingen: Array<any>;
	@Input() cursussen: Array<any>;
	@Output() onSelectedOpleiding = new EventEmitter<Object>();

	@ViewChild('OpleidingModal') opleidingModal: any;
	selectedOpleiding = <any>{};
	updatedOpleiding = <any>{};

	opleidingForm = <any>{};

	cohorten: Array<any>;
    selectedCohort = <any>{};

	@ViewChild('BeroepstaakModal') beroepstaakModal: any;
	allBeroepstaken: Array<any>;
	beroepstakenForm = <any>{};
	beroepstakenTypes = <any>{};

	@ViewChild('ProfessionalskillModal') professionalskillModal: any;
	allProfessionalskills: Array<any>;
	professionalskillsTypes = <any>{};
	professionalskillForm = <any>{};

	@ViewChild('CursusModal') cursusModal: any;
    availableCursussen: Array<any>;
    allCursussen: Array<any>;
	cursusForm = <any>{};

	loading: boolean;
	naam: string;
	selectedButton: number;
	mode: string;

	//
	isVisibleOrganisatieOpleidingsprofiel_post:boolean;
	isVisibleOpleidingsprofiel_put:boolean;

	isVisibleOpleidingsprofielBeroepstaak_post:boolean;
	isVisibleOpleidingsprofielBeroepstaak_delete:boolean;
	isVisibleOpleidingsprofielProfessional_post:boolean;
	isVisibleOpleidingsprofielProfessional_delete:boolean;
	isVisibleCohortCursus_post:boolean;
	isVisibleCohortCursus_delete:boolean;

	constructor(private opleidingenService: OpleidingenService,
		private cohortenService: CohortenService,
		private cursussenService: CursussenService,
		private leerplannenService: LeerplannenService,
		private toetsProgrammaService: ToetsProgrammaService,
		private professionalskillService: ProfessionalskillsService,
		private beroepstakenService: BeroepstakenService,
		private functieService:FunctieService,
		private authService:AuthService,
		private afAuth: AngularFireAuth) {
			this.loading = true;
			this.cursussen = [];
			this.allCursussen = [];
			this.selectedButton = 1;
			this.mode = 'view';
			let self = this;
			this.afAuth.authState.subscribe((auth) => {
				this.authService.maakTokenHeadervoorCurcon().then( token => {
					console.log(token);

					self.opleidingenService.getOpleidingen(token).subscribe(opleidingen => {
						self.opleidingen= opleidingen;
						console.log(this.opleidingen);
						console.log(this.opleidingen[0]);
						self.onSelectOpleiding(this.opleidingen[0]);
						this.loadButtons();
					},

					() => {
						self.loading = false;
					});
				});
			})
		}

	ngOnInit(): void {

	}

	loadButtons() {
    	var email= this.afAuth.auth.currentUser.email;
	    //this.loading = true;
	    let self = this;

	    this.authService.maakTokenHeadervoorCurcon().then( token => {
	      	this.functieService.getFunctiesByUser(email).subscribe(functies => {

		        if (functies == null) {
								console.log("je mag niks:)");
		        } else {
							if (functies.some(f=> f.name == "organisatieopleidingsprofiel_post")) {
								 this.isVisibleOrganisatieOpleidingsprofiel_post=true;
							}
							if (functies.some(f=> f.name == "opleidingsprofiel_put")) {
								 this.isVisibleOpleidingsprofiel_put=true;
							}
							if (functies.some(f=> f.name == "opleidingsprofielberoepstaak_post")) {
								 this.isVisibleOpleidingsprofielBeroepstaak_post=true;
							}
							if (functies.some(f=> f.name == "opleidingsprofielberoepstaak_delete")) {
								 this.isVisibleOpleidingsprofielBeroepstaak_delete=true;
							}
							if (functies.some(f=> f.name == "opleidingsprofielprofessional_post")) {
								 this.isVisibleOpleidingsprofielProfessional_post=true;
							}
							if (functies.some(f=> f.name == "opleidingsprofielprofessional_delete")) {
								 this.isVisibleOpleidingsprofielProfessional_delete=true;
							}
							if (functies.some(f=> f.name == "cohortcursus_post")) {
								 this.isVisibleCohortCursus_post=true;
							}
							if (functies.some(f=> f.name == "cohortcursus_delete")) {
								 this.isVisibleCohortCursus_delete=true;
							}
		        }

	        	//this.loading = false;
	      });
	    })
	}

	setMode(mode) {
		this.mode = mode;
	}

	onSelectOpleiding(opleiding : Object) {
		this.onSelectedOpleiding.emit(opleiding);
		this.selectedOpleiding = opleiding;
		console.log(this.selectedOpleiding);
		console.log(this.selectedOpleiding.eindBt);

		this.authService.maakTokenHeadervoorCurcon().then( token => {
			this.beroepstakenService.getBeroepstakenByObject(this.selectedOpleiding.eindBT, token).subscribe(beroepstaken => {
				this.selectedOpleiding.beroepstaken = [];
				this.selectedOpleiding.beroepstaken = beroepstaken;
				console.log(this.selectedOpleiding.beroepstaken);
			});
		});
		console.log(this.selectedOpleiding.profiel);

		this.authService.maakTokenHeadervoorCurcon().then( token => {
	        this.cohortenService.getCohortenByObject(this.selectedOpleiding['cohorten'], token).subscribe(cohorten => {
	            this.cohorten= cohorten;
	            this.selectedCohort = this.cohorten[0];
				console.log("Start loading profiel");

				this.authService.maakTokenHeadervoorCurcon().then( token => {
					this.leerplannenService.getLeerplannenProfiel(this.selectedCohort.id, token).subscribe(data => {
						console.log("getCalculatedProfile data");
						console.log(data);
						this.selectedOpleiding.profiel = data;
						console.log("this.selectedOpleiding");
						console.log(this.selectedOpleiding);
						this.refreshProfessionalskills();
						this.refreshCursussen();
						console.log("---- this.selectedOpleiding ----");
						console.log(this.selectedOpleiding);
						console.log("---- this.selectedCohort ----");
						console.log(this.selectedCohort);
								this.loading = false;
							});
						});
	        });
	    });
	}

	changeTab(tabnr : number) {
		this.selectedButton = tabnr;
	}

	saveOpleiding(form: any) {
		this.loading = true;

  	this.updatedOpleiding = form.value;
		console.log(this.updatedOpleiding);
		this.updatedOpleiding.id=	this.selectedOpleiding.id;
		console.log(this.updatedOpleiding);
		this.authService.maakTokenHeadervoorCurcon().then( token => {
			this.opleidingenService.saveOpleiding(this.updatedOpleiding, token).subscribe(x => {
				this.mode = 'view';
				this.refreshOpleidingen();
			});
		});
	}
	
refreshOpleidingen(){
	this.authService.maakTokenHeadervoorCurcon().then( token => {
		this.opleidingenService.getOpleidingen(token).subscribe(opleidingen => {
				console.log(opleidingen);
				this.opleidingen= opleidingen;
				let refreshOpleiding=opleidingen.find(o=> o.id == this.selectedOpleiding.id);
				this.onSelectOpleiding(refreshOpleiding);
				this.loading = false;
		});
	});
}
	newOpleidingForm() {
		this.opleidingForm = {};
	}

	addOpleiding() {
		//FIXME hardcoded values weg en profiel selecteren na insert
		delete this.opleidingForm.code;

		this.authService.maakTokenHeadervoorCurcon().then( token => {
      		//console.log(token);

			this.opleidingenService.saveOpleiding(this.opleidingForm, token).subscribe(x => {
				this.selectedCohort = {
					jaar: "2018"
				};
				var opleidingId = 5;
				this.cohortenService.saveCohort(opleidingId, this.selectedCohort, token);

				this.opleidingen.push(this.opleidingForm);
				this.onSelectOpleiding(this.opleidingForm);
			});
		});
	}

	// ******************
	// Beroepstaak operaties
	// ******************

	getBeroepstaakTypes() {
		this.loading = true;

		this.authService.maakTokenHeadervoorCurcon().then( token => {
      		//console.log(token);

			this.beroepstakenService.getBeroepstaakTypes(token).subscribe(result => {
				this.beroepstakenTypes = result;
				this.beroepstakenForm = {architectuurlaag: 1, activiteit: 1, niveau: 1};
				this.loading = false;
			});
		});
	}

	getAllBeroepstaken() {
		this.loading = true;

		this.authService.maakTokenHeadervoorCurcon().then( token => {
      		//console.log(token);

			this.beroepstakenService.getBeroepstaken(token).subscribe(result => {
				this.allBeroepstaken = result;
				for(let bt of this.selectedOpleiding.beroepstaken) {
					this.allBeroepstaken = this.allBeroepstaken.filter((x) => x.id !== bt.id);
				}
				this.loading = false;
			});
		});
	}

	loadBeroepstaken() {
		  this.loading = true;
		this.authService.maakTokenHeadervoorCurcon().then( token => {
      		//console.log(token);

			this.beroepstakenService.getBeroepstakenByObject(this.selectedOpleiding.eindBT, token).subscribe(beroepstaken => {
				this.selectedOpleiding.beroepstaken = [];
				this.selectedOpleiding.beroepstaken = beroepstaken;
				  this.loading = false;
			});
		});
	}

	addBeroepstaak() {
		this.loading = true;

		this.authService.maakTokenHeadervoorCurcon().then( token => {
      		//console.log(token);

			this.beroepstakenService.getBeroepstaakId(this.beroepstakenForm.activiteit,
				this.beroepstakenForm.architectuurlaag, this.beroepstakenForm.niveau, token).subscribe(data => {
					this.opleidingenService.addBeroepstakenToOpleiding(this.selectedOpleiding.id, data, token).subscribe(x => {
						//this.beroepstaakModal.hide();
						this.loadBeroepstaken();
						this.loading = false;
					});
			});
		});
	}

	deleteBeroepstaak(bt: Object) {
		this.authService.maakTokenHeadervoorCurcon().then( token => {
      		//console.log(token);
			this.opleidingenService.deleteBeroepstaak(this.selectedOpleiding.id, bt['id'], token).subscribe(
				result => { this.selectedOpleiding.beroepstaken = this.loadBeroepstaken(); },
				error => { this.selectedOpleiding.beroepstaken = this.loadBeroepstaken(); }
			);
		});
	}

	// ******************
	// Professional skills operaties
	// ******************

	refreshProfessionalskills() {
		this.authService.maakTokenHeadervoorCurcon().then( token => {
      		//console.log(token);

			this.professionalskillService.getProfessionalskillsByObject(this.selectedOpleiding.eindPS, token).subscribe(professionalskills => {
				this.selectedOpleiding.professionalskills = professionalskills;
			});
		});
	}

	getProfessionalskillTypes() {
		this.loading = true;

		this.authService.maakTokenHeadervoorCurcon().then( token => {
      		//console.log(token);

			this.professionalskillService.getProfessionalskillsTypes(token).subscribe(result => {
				this.professionalskillsTypes = result;
				this.professionalskillForm = {activiteit: 6, niveau: 'T'};
				this.loading = false;
			});
		});
	}

	addProfessionalskill() {
		this.loading = true;

		this.authService.maakTokenHeadervoorCurcon().then( token => {
      		//console.log(token);

			this.professionalskillService.getProfessionalskillId(this.professionalskillForm.activiteit, this.professionalskillForm.niveau, token).subscribe(data => {
				this.opleidingenService.addProfessionalskillToOpleiding(this.selectedOpleiding.id, data, token).subscribe(x => {
					this.professionalskillModal.hide();
					this.refreshProfessionalskills();
					this.loading = false;
				});
			});
		});
	}

	deleteProfessionalskill(ps: Object) {
		this.authService.maakTokenHeadervoorCurcon().then( token => {
      		//console.log(token);

			this.opleidingenService.deleteProfessionalskill(this.selectedOpleiding.id, ps['id'], token).subscribe(
				result => { this.refreshProfessionalskills(); },
				error => { this.refreshProfessionalskills(); }
			);
		});
	}

	refreshCursussen() {
		console.log("refreshCursussen")
		console.log(this.selectedCohort)

		//this.authService.maakTokenHeadervoorCurcon().then( token => {
      		//console.log(token);
	this.authService.maakTokenHeadervoorCurcon().then( token =>

			this.cursussenService.getCursussenByObject(this.selectedCohort.cursussen, token).subscribe(cursussen => {
				this.cursussen= cursussen;;
				console.log(this.cursussen);
				for(let c of this.cursussen) {

      					//console.log(token);

						this.beroepstakenService.getBeroepstakenByObject(c.eindBT, token).subscribe(beroepstaken => {
							c.beroepstaken = [];
							c.beroepstaken = beroepstaken;

						//	this.authService.maakTokenHeadervoorCurcon().then( token => {
      							//console.log(token);
								this.professionalskillService.getProfessionalskillsByObject(c.eindPS, token).subscribe(professionalskills => {
									c.professionalskills = [];
									c.professionalskills = professionalskills;
								});
							});
				}
			}));
    }

	closeModal(modal) {
		this.loading = false;
		modal.hide()
	}

	isEmptyObject(obj) {
		return (Object.keys(obj).length === 0);
	}

    addCursusToCohort(form: any) {
        this.loading = true;
		// console.log(form)
		// console.log("addCursusToCohort "+this.selectedCohort.id+" "+form)

		this.authService.maakTokenHeadervoorCurcon().then( token => {
      		//console.log(token);

	        this.cohortenService.addCursusToCohort(this.selectedCohort.id, form, token).subscribe(data => {
	            this.cursusModal.hide();
				// this.cursusForm = data;
	            this.onSelectOpleiding(this.selectedOpleiding);
	            this.loading = false;
	        });
	    });
    }

    deleteCursusFromCohort(cursus: any) {
    	console.log("deleteCursusFromCohort "+this.selectedCohort.id)
    	console.log(cursus)

    	this.authService.maakTokenHeadervoorCurcon().then( token => {
      		//console.log(token);

	        this.cohortenService.deleteCursus(this.selectedCohort.id, cursus.id, token).subscribe(result => {
	            this.onSelectOpleiding(this.selectedOpleiding);
	        },
	        error => { }
	        );
	    });
    }

    initializeCursusForm() {
        this.loading = true;
//<<<<<<< HEAD
			this.authService.maakTokenHeadervoorCurcon().then( token => {
	   		this.cursusForm = {};
	        console.log('1 this.cursussen');
	        console.log(this.cursussen);
	    	this.cursussenService.getCursussen(token).subscribe(data => {
	            console.log('2 data');
	            console.log(data);
							//changed
							this.availableCursussen=null;
	    				this.allCursussen=data;
					// End change
	            console.log('3 this.allCursussen');
	            console.log(this.allCursussen);
	    		let selectedCursus = this.cursussen[0];
	    		this.cursusForm = {cursus: selectedCursus};
	            this.availableCursussen = this.allCursussen;
	            console.log('4 this.availableCursussen');
	            console.log(this.availableCursussen);
	            for (let c of this.cursussen) {
	                this.availableCursussen = this.availableCursussen.filter((x) => x.id !== c.id);
	            }
	            console.log('this.availableCursussen');
	            console.log(this.availableCursussen);
	            var id = 0;
	            if (this.availableCursussen.length > 0){
	                id = this.availableCursussen[0].id;
	            }
	            this.cursusForm = {id: id};
	            this.loading = false;
	    	});
			});

    }

onSelectCohort(coh: Object) {
this.loading = true;
this.authService.maakTokenHeadervoorCurcon().then( token => {
this.cursussenService.getCursussenByObject(coh['cursussen'],token).subscribe(cur => {
this.cursussen = cur;
for(let index = 0; index < this.cursussen.length; index++) {
this.beroepstakenService.getBeroepstakenByObject(this.cursussen[index].eindBT,token).subscribe(beroepstaken => {
this.cursussen[index].beroepstaken = [];
let btMatrix = this.generateMatrix();

//console.log(beroepstaken);
for(let btIndex = 0; btIndex < beroepstaken.length; btIndex++) {
btMatrix[beroepstaken[btIndex].architectuurlaagId][beroepstaken[btIndex].activiteitId]
= beroepstaken[btIndex];
//
btMatrix[beroepstaken[btIndex].architectuurlaagId][beroepstaken[btIndex].activiteitId]
= beroepstaken[btIndex];
this.cursussen[index].beroepstaken.push(beroepstaken[btIndex]);
}
this.cursussen[index].btMatrix = btMatrix;
});

this.professionalskillService.getProfessionalskillsByObject(this.cursussen[index].eindPS,token).subscribe(professionalskills => {
this.cursussen[index].professionalskills = [];
for(let j = 0; j < professionalskills.length; j++) {
this.cursussen[index].professionalskills.push(professionalskills[j]);
}
});

}
this.selectedCohort = coh;
this.loading = false;
});
})
}

	generateMatrix() {
		let btMatrix = Array.apply(null, Array(6));
		for(let i = 0; i < btMatrix.length; i++) {
			btMatrix[i] = Array.apply(null, Array(6));
		}
		btMatrix[0][1] = 'B';
		btMatrix[0][2] = 'A';
		btMatrix[0][3] = 'A';
		btMatrix[0][4] = 'O';
		btMatrix[0][5] = 'R';
		btMatrix[1][0] = 'G';
		btMatrix[2][0] = 'B';
		btMatrix[3][0] = 'I';
		btMatrix[4][0] = 'S';
		btMatrix[5][0] = 'H';
		return btMatrix;
	}

}
