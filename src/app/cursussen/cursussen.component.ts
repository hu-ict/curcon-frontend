import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {CursussenService} from '../services/cursussen.service';
import {BeroepstakenService} from '../services/beroepstaken.service';
import {ProfessionalskillsService} from '../services/professionalskills.service';
import {LeerdoelenService} from '../services/leerdoelen.service';
import {ToetsenService} from '../services/toetsen.service';
import {ToetsmatrijzenService} from "../services/toetsmatrijzen.service";
import {BloomniveausService} from "../services/bloomniveaus.service";
import {MillerNiveausService} from "../services/millerniveaus.service";
import {DocentenService} from "../services/docenten.service";
import {BtMatrixComponent} from '../bt-overzicht/bt-matrix.component';
import {PsOverzichtComponent} from '../ps-overzicht/ps-overzicht.component';
import {ToetsMatrijs} from './toetsmatrijs';

@Component({
	templateUrl: 'cursussen.component.html',
})
export class CursussenComponent implements OnInit {
	@ViewChild('BeroepstaakModal') beroepstaakModal: any;
	allBeroepstaken: Array<any>;
	beroepstakenTypes = <any>{};
	beroepstakenForm = <any>{};

	@ViewChild('ProfessionalskillModal') professionalskillModal: any;
	allProfessionalskills: Array<any>;
	professionalskillsTypes = <any>{};
	professionalskillForm = <any>{};

	@ViewChild('LeerdoelModal') leerdoelModal: any;
	@ViewChild('BeoordelingselementModal') beoordelingselementModal: any;
	beoordelingselementForm = <any>{};

	@ViewChild('CursusModal') cursusModal: any;
	@ViewChild('ToetsModal') toetsModal: any;
	@Input() courses: Array<any>;
	@Output() onSelectedCourse = new EventEmitter<Object>();
	allDocenten: Array<any>;
	allBloomniveaus: Array<any>;
	allMillerNiveaus: Array<any>;
	loading: boolean;
	naam: string;
	error: boolean;
	selectedCursus = <any>{};
	cursusForm = <any>{};
	mode: string;
	toetsMatrijsEdit: number;
	toetsMatrijsAdd = <any>{};
	toetsMatrijsEditForm = <any>{};
	toetsMatrijsAddForm = <any>{};

	toetsMatrijsArray: Array<ToetsMatrijs>;

	toetsEdit = <any>{};
	toetsForm = <any>{};
	leerdoelForm = <any>{};

	constructor(private cursussenService: CursussenService, private docentenService: DocentenService, private beroepstaakService: BeroepstakenService, private professionalskillService: ProfessionalskillsService, private leerdoelenService: LeerdoelenService, private toetsenService: ToetsenService, private toetsmatrijzenService: ToetsmatrijzenService, private bloomniveauService: BloomniveausService, private millerNiveausService: MillerNiveausService) {
		this.loading = true;
	}

	ngOnInit(): void {
		this.cursusForm = {};
		this.mode = 'view';
		this.toetsMatrijsEdit = 0;
		this.toetsMatrijsAdd = [];
		this.toetsMatrijsArray = Array.apply(null, Array(10));
		this.cursussenService.getCursussen().subscribe(cursussen => {
			this.courses = cursussen;
			this.selectedCursus = this.courses[0];
			this.cursusForm = this.courses[0];
			this.refreshAll();
		},
		error => console.log('Error: ', error),
		() => {
			this.loading = false;
		});
		this.millerNiveausService.getMillerNiveaus().subscribe(millerNiveaus => {
			this.allMillerNiveaus = millerNiveaus;
		},
		error => console.log('Error: ', error),
		() => {
			this.loading = false;
		});
	}


	changeMode(mode) {
		this.refreshDocenten();
		this.mode = mode;
	}

	// ******************
	// Cursus operaties
	// ******************

	onSelect(cursus: Object) {
		this.onSelectedCourse.emit(cursus);
		this.selectedCursus = cursus;
		this.cursusForm = cursus;
		this.refreshAll();
		console.log("onSelect(this.selectedCursus)");
		console.log(this.selectedCursus);
	}

	private refreshCursussen() {
		this.loading = true;
		this.cursussenService.getCursussen().subscribe(cursussen => {
			this.courses = cursussen;
			this.loading = false;
		},
		error => console.log('Error: ', error),
		() => {
			this.loading = false;
			console.log(this.selectedCursus);
		});
	}


	saveCursus(form: any) {
		this.loading = true;
		var formValues = form.value;
		this.cursussenService.updateCursus(this.selectedCursus.id, formValues).subscribe( data => {
			this.mode = 'view';
			this.cursussenService.getCursussenByObject(this.selectedCursus).subscribe(cursus => {
				this.onSelect(cursus);
				this.loading = false;
				this.cursusModal.hide()
			});
		});
	}

	addCursus() {
		this.loading = true;
		console.log(this.cursusForm);
		this.cursussenService.addCursus(this.cursusForm).subscribe(
				(res:Response) => {
					var contentLocation = res.headers.get("Content-Location");
					console.log("Content-Location: "+contentLocation);
					this.cursussenService.getDataByHref(contentLocation).subscribe(cursus => {
						this.onSelect(cursus);
						this.loading = false;
						this.cursusModal.hide()
					})
				}
		);
	}

	initializeCursusForm() {
		this.loading = true;
		this.cursusForm = {};
		this.docentenService.getDocenten().subscribe(data => {
			this.allDocenten = data;
			let selectedDocent = 0;
			if(data.length > 0)
				selectedDocent = data[0].id;
			this.cursusForm = {coordinator: selectedDocent};
			this.loading = false;
		});
	}

	// ******************
	// Professionalskill operaties
	// ******************
	deleteProfessionalskill(ps: Object) {
		this.cursussenService.deleteProfessionalskill(this.selectedCursus.id, ps['id']).subscribe(
				result => { this.refreshProfessionalskills(); },
				error => { this.refreshProfessionalskills(); });
	}

	deleteBeoordelingsElement(el) {
		this.toetsenService.deleteBeoordelingselement(el['id']).subscribe(
				result => { this.refreshToetsen(); this.refreshToetsMatrijzen() },
				error => { this.refreshToetsen(); this.refreshToetsMatrijzen();});
	}

	getProfessionalskillTypes() {
		this.loading = true;
		this.professionalskillService.getProfessionalskillsTypes().subscribe(result => {
			this.professionalskillsTypes = result;
			this.professionalskillForm = {activiteit: 6, niveau: 'T'};
			this.loading = false;
		});
	}

	initializeBeoordelingsForm(toets) {
		this.loading = true;
		this.toetsEdit = toets;
		this.beoordelingselementForm = {};
		this.loading = false;
	}

	getAllProfessionalskills() {
		this.loading = true;
		this.professionalskillService.getProfessionalskills().subscribe(result => {
			this.allProfessionalskills = result;
			for (let i = 0; i < this.selectedCursus.professionalskills.length; i++) {
				this.allProfessionalskills = this.allProfessionalskills.filter((x) => x.id !== this.selectedCursus.professionalskills[i].id);
			}
			this.loading = false;
		});
	}

	addProfessionalskill() {
		this.loading = true;
		this.professionalskillService.getProfessionalskillId(this.professionalskillForm.activiteit, this.professionalskillForm.niveau).subscribe(data => {
			this.cursussenService.addProfessionalskillToCursus(this.selectedCursus.id, data).subscribe(x => {
				this.professionalskillModal.hide();
				this.refreshProfessionalskills();
				this.loading = false;
			});
		});
	}


	addProfessionalskills() {
		let selected = this.allProfessionalskills.filter((x) => x.selected)
		this.error = false;

		if(selected.length == 0)
			this.error = true;

		if(!this.error) {
			for(let i = 0; i < selected.length; i++) {
				this.cursussenService.addProfessionalskillToCursus(this.selectedCursus.id, selected[i]).subscribe(x => {
					this.professionalskillModal.hide();
					this.refreshProfessionalskills();
				});
			}
		}
	}



//	******************
//	Beroepstaak operaties
//	******************

	addBeroepstaak() {
		this.loading = true;
		this.beroepstaakService.getBeroepstaakId(this.beroepstakenForm.activiteit, this.beroepstakenForm.architectuurlaag, this.beroepstakenForm.niveau).subscribe(data => {
			this.cursussenService.addBeroepstakenToCursus(this.selectedCursus.id, data).subscribe(x => {
				this.beroepstaakModal.hide();
				this.refreshBeroepstaken();
				this.loading = false;
			});
		});
	}

	deleteBeroepstaak(bt: Object) {
		this.cursussenService.deleteBeroepstaak(this.selectedCursus.id, bt['id']).subscribe(
				result => { this.refreshBeroepstaken() },
				error => { this.refreshBeroepstaken() });
	}
	getBeroepstaakTypes() {
		this.loading = true;
		this.beroepstaakService.getBeroepstaakTypes().subscribe(result => {
			this.beroepstakenTypes = result;
			this.beroepstakenForm = {architectuurlaag: 1, activiteit: 1, niveau: 1};
			this.loading = false;
		});
	}
	
	getAllBeroepstaken() {
		this.loading = true;
		this.beroepstaakService.getBeroepstaken().subscribe(result => {
			this.allBeroepstaken = result;
			for(let i = 0; i < this.selectedCursus.beroepstaken.length; i++) {
				this.allBeroepstaken = this.allBeroepstaken.filter((x) => x.id !== this.selectedCursus.beroepstaken[i].id);
			}
			this.loading = false;
		});
	}

//	******************
//	Leerdoel operaties
//	******************

	initializeLeerdoelForm() {
		this.loading = true;
		this.leerdoelForm = {};
		this.bloomniveauService.getBloomniveaus().subscribe(data => {
			this.allBloomniveaus = data;
			let selectedBeroepstaak = 0;
			if (this.selectedCursus.beroepstaken.length > 0)
				selectedBeroepstaak = this.selectedCursus.beroepstaken[0].id;

			let selectedProfessionalSkill = 0;
			if (this.selectedCursus.professionalskills.length > 0)
				selectedProfessionalSkill = this.selectedCursus.professionalskills[0].id;

			this.leerdoelForm = {
					eindBT: selectedBeroepstaak,
					eindPS: selectedProfessionalSkill,
					bloomniveau: data[0].id,
					gewicht: 0.0,
					omschrijving: ""
			};
			this.loading = false;
		});
	}

	initializeLeerdoelModal(leerdoel) {
		console.log("leerdoel");
		console.log(leerdoel);
		console.log("this.selectedCursus.professionalskills");
		console.log(this.selectedCursus.professionalskills);
		this.leerdoelModal.show();
		this.loading = true;
		if (this.allBloomniveaus == null) {
			this.bloomniveauService.getBloomniveaus().subscribe(bloomniveaus => {
				this.allBloomniveaus = bloomniveaus;
			});
		};
		this.leerdoelForm = {
				id : leerdoel.id,
				eindBT: leerdoel.eindBT.id,
				eindPS: leerdoel.eindPS.id,
				bloomniveau: leerdoel.bloomniveau.id,
				gewicht: leerdoel.gewicht,
				omschrijving: leerdoel.omschrijving
		};
		console.log("leerdoelForm");
		console.log(this.leerdoelForm);
		this.loading = false
	}

	saveLeerdoel() {
		this.loading = true;
		this.cursussenService.saveLeerdoel(this.selectedCursus.id, this.leerdoelForm).subscribe(x => {
			this.refreshLeerdoelen();
			this.refreshToetsMatrijzen();
			this.closeModal(this.leerdoelModal);
		});
	}

	deleteLeerdoel(ld: Object) {
		this.cursussenService.deleteLeerdoel(ld['id']).subscribe(
				result => { this.refreshLeerdoelen(); this.refreshToetsMatrijzen(); },
				error => { this.refreshLeerdoelen(); this.refreshToetsMatrijzen(); });
	}


//	******************
//	Toets operaties
//	******************

	newToetsForm() {
		console.log("newToetsForm()");
		this.toetsForm = {
			naam: "",
			millerNiveau: this.allMillerNiveaus[0].id,
			gewicht: 50.0,
			omschrijving: ""
		};
	}

	editToetsForm(toets) {
		console.log("editToetsForm(toets)");
		console.log(toets);
		this.toetsForm = {
			id : toets.id,
			naam : toets.naam,
			gewicht : toets.gewicht,
			millerNiveau : toets.millerNiveau.id
		};
	}

	saveToets() {
		this.loading = true;
		console.log(this.toetsForm);
		this.cursussenService.saveToets(this.selectedCursus.id, this.toetsForm).subscribe(x => {
			this.refreshToetsen();
			this.refreshToetsMatrijzen()
			this.toetsModal.hide();
			this.loading = false;
		});
	}

	deleteToets(to: Object) {
		this.cursussenService.deleteToets(to['id']).subscribe(
				result => { this.refreshToetsen(); this.refreshToetsMatrijzen(); },
				error => { this.refreshToetsen(); this.refreshToetsMatrijzen(); });
	}

	initializeBeoordelingselementModal(beoordelingselement) {
		console.log(beoordelingselement);
		this.beoordelingselementModal.show();
		this.loading = true;
		this.beoordelingselementForm = {
				naam : beoordelingselement.naam,
				id : beoordelingselement.id,
				gewicht : beoordelingselement.gewicht,
				omschrijving : beoordelingselement.omschrijving
		};
		this.loading = false
	}

	saveBeoordelingselement(element) {
		this.loading = true;
		console.log(element);
		this.toetsenService.saveBeoordelingsElement(this.toetsEdit.id, element).subscribe(data => {
			this.refreshToetsen();
			this.refreshToetsMatrijzen();
			this.beoordelingselementModal.hide();
			this.loading = false;
		});
	}

	checkbox(item) {
		item.selected = (item.selected) ? false : true;
	}

	editCell(id, gewicht) {
		if(id != null)
			this.toetsMatrijsAdd = [];
		this.toetsMatrijsEdit = id;
		this.toetsMatrijsEditForm.gewicht = gewicht;
	}

	addCell(item) {
		if(item != null) {
			this.toetsMatrijsAdd = item;
			console.log("addCell - this.toetsMatrijsAdd");
			console.log(this.toetsMatrijsAdd);
			this.toetsMatrijsAddForm = {};
			this.toetsMatrijsAddForm.beoordelingsElement = item.beoordelingselement;
			console.log("addCell - this.toetsMatrijsAddForm");
			console.log(this.toetsMatrijsAddForm);
		}
		this.toetsMatrijsEdit = 0;

	}

	editToetsElement() {
		this.loading = true;
		console.log(this.toetsMatrijsAdd);
		console.log(this.toetsMatrijsAddForm);
		this.cursussenService.editToetsElement(this.toetsMatrijsEdit, this.toetsMatrijsEditForm).subscribe(x => {
			this.refreshToetsMatrijzen();
			this.toetsMatrijsEdit = 0;
			this.loading = false;
		});
	}

	addToetsElement() {
		this.loading = true;
		this.toetsMatrijsAddForm.beoordelingsElement = this.toetsMatrijsAdd.beoordelingselement.id;
		console.log("addToetsElement - this.toetsMatrijsAdd");
		console.log(this.toetsMatrijsAdd);
		console.log("this.toetsMatrijsAddForm");
		console.log(this.toetsMatrijsAddForm);
		this.cursussenService.addToetsElement(this.toetsMatrijsAdd.leerdoel.id, this.toetsMatrijsAddForm).subscribe(x => {
			this.refreshToetsMatrijzen();
			this.toetsMatrijsAdd = {};
			this.loading = false;
		});
	}

	deleteToetsElement() {
		this.loading = true;
		this.cursussenService.deleteToetsElement(this.toetsMatrijsEdit).subscribe(x =>{
			this.refreshToetsMatrijzen();
			this.toetsMatrijsEdit = 0;
			this.loading = false;
		});
	}

	cancelEditGewicht() {
		this.toetsMatrijsEdit = 0;
	}

	cancelSaveGewicht() {
		this.toetsMatrijsAdd = [];
	}

	refreshDocenten() {
		this.loading = true;
		this.docentenService.getDocenten().subscribe(docenten => {
			this.allDocenten = docenten;
			this.loading = false;
		});
	}

	refreshBeroepstaken() {
		this.loading = true;
		this.beroepstaakService.getBeroepstakenByObject(this.selectedCursus.eindBT).subscribe(beroepstaken => {
			this.selectedCursus.beroepstaken = beroepstaken;
			console.log("selectedCursus.beroepstaken");
			console.log(this.selectedCursus.beroepstaken);
			this.loading = false;
		});
	}

	refreshProfessionalskills() {
		this.loading = true;
		this.professionalskillService.getProfessionalskillsByObject(this.selectedCursus.eindPS).subscribe(professionalskills => {
			this.selectedCursus.professionalskills = professionalskills;
			this.loading = false;
		});
	}

	refreshLeerdoelen() {
		this.loading = true;
		this.leerdoelenService.getLeerdoelenByObject(this.selectedCursus.leerdoelen).subscribe(leerdoelen => {
			this.selectedCursus.leerdoelenLijst = leerdoelen;
			this.loading = false;
		});
	}


	refreshToetsen() {
		this.loading = true;
		this.toetsenService.getToetsenByObject(this.selectedCursus.toetsen).subscribe(toetsen => {
			this.selectedCursus.toetsenLijst = toetsen;
			this.loading = false;
		});
	}

	refreshToetsMatrijzen() {
		this.loading = true;

		this.toetsmatrijzenService.getToetsmatrijzenById(this.selectedCursus.id).subscribe(toetsmatrijs => {
			console.log('refreshToetsMatrijzen toetsmatrijs');
			console.log(toetsmatrijs);
			if (this.toetsMatrijsArray != undefined) {
				while (this.toetsMatrijsArray.length > 0) {
					this.toetsMatrijsArray.splice(0, 1);
					console.log(this.toetsMatrijsArray.length);
					console.log('toetsMatrijsArray.length');
				}
			}
			let toetsIndex = 0;
			for (let toets of toetsmatrijs.toetsen) {
				console.log(toets);
				this.toetsMatrijsArray[toetsIndex] = this.buildToetsMatrijs(toets, toetsmatrijs.leerdoelen);
				toetsIndex++;
			}
			console.log("this.toetsMatrijsArray");
			console.log(this.toetsMatrijsArray);
			this.loading = false;
		})
	}

	buildToetsMatrijs(toets, leerdoelen) {
		let toetsMatrijs = new ToetsMatrijs();
		toetsMatrijs.naam = toets.naam;
		var totalCols = 0;
		if (toets.beoordelingsElementen != null) {
			totalCols = toets.beoordelingsElementen.length;
			toetsMatrijs.beoordelingselementArray = Array.apply(null, Array(totalCols)); 
			toetsMatrijs.totaalGewichtElementArray = Array.apply(null, Array(totalCols));
			var index = 0;
			for (let element of toets.beoordelingsElementen) {
				toetsMatrijs.beoordelingselementArray[index] = element;
				toetsMatrijs.totaalGewichtElementArray[index] = 0;
				index++;
			}
		}

		var totalRows = 0;
		if (leerdoelen != null) {
			totalRows = leerdoelen.length; 
			toetsMatrijs.totaalGewichtLeerdoelArray = Array.apply(null, Array(leerdoelen.length))
		}
		console.log("toetsMatrijs.beoordelingselementArray");
		console.log(toetsMatrijs.beoordelingselementArray);
		console.log("Total rows:" + totalRows);
		console.log("Total cols:" + totalCols);

		// grid aanmaken
		toetsMatrijs.grid = Array.apply(null, null);
		let grid = Array.apply(null, Array(totalRows)); 
		for(let i = 0; i < grid.length; i++) {
			grid[i] = Array.apply(null, Array(totalCols)); 
		}
		console.log("Grid aangemaakt");
		for(let row = 0; row < leerdoelen.length; row++) {
			toetsMatrijs.totaalGewichtLeerdoelArray[row] = 0;
			for (let col = 0; col < totalCols; col++) {
				var toetsElement = {
						beoordelingselement : toetsMatrijs.beoordelingselementArray[col],
						leerdoel : leerdoelen[row],
						id : 0,
						gewicht : 0
				};
				grid[row][col] = toetsElement;
				for (let p = 0; p < leerdoelen[row].toetsElementen.length; p++) {
					// totalGewicht +=
					// toetsmatrijs.leerdoelen[row].toetsElementen[p].gewicht;
					var beoordelingsElementId = leerdoelen[row].toetsElementen[p].beoordelingsElement.id;
					if (beoordelingsElementId == toetsMatrijs.beoordelingselementArray[col].id) {
						grid[row][col] = leerdoelen[row].toetsElementen[p];
						toetsMatrijs.totaalGewichtLeerdoelArray[row] = toetsMatrijs.totaalGewichtLeerdoelArray[row] + leerdoelen[row].toetsElementen[p].gewicht;
						toetsMatrijs.totaalGewichtElementArray[col] = toetsMatrijs.totaalGewichtElementArray[col] + leerdoelen[row].toetsElementen[p].gewicht;
					}
				}
				console.log('grid[row][col]');
				console.log(grid[row][col]);
			}
		}
		toetsMatrijs.grid = grid;
		console.log("toetsMatrijs");
		console.log(toetsMatrijs);
		return toetsMatrijs;
	}


	refreshAll() {
		this.refreshBeroepstaken();
		this.refreshProfessionalskills();
		this.refreshLeerdoelen();
		this.refreshToetsen();
		this.refreshToetsMatrijzen();
		console.log(this.selectedCursus);
	}

	closeModal(modal) {
		this.loading = false;
		modal.hide()
	}

	isEmptyObject(obj) {
		return (Object.keys(obj).length === 0);
	}


}
