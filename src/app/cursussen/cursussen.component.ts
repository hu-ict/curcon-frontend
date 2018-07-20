import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {CursussenService} from '../services/curcon/cursussen.service';
import {BeroepstakenService} from '../services/curcon/beroepstaken.service';
import {ProfessionalskillsService} from '../services/curcon/professionalskills.service';
import {LeerdoelenService} from '../services/curcon/leerdoelen.service';
import {ToetsenService} from '../services/curcon/toetsen.service';
import {ToetsmatrijzenService} from '../services/curcon/toetsmatrijzen.service';
import {BloomniveausService} from '../services/curcon/bloomniveaus.service';
import {MillerNiveausService} from '../services/curcon/millerniveaus.service';
import {DocentenService} from '../services/docenten.service';
import {BtMatrixComponent} from '../bt-overzicht/bt-matrix.component';
import {PsOverzichtComponent} from '../ps-overzicht/ps-overzicht.component';
import {ToetsMatrijs} from './toetsmatrijs';
import {AuthService} from '../providers/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {FunctieService } from '../services/functie.service';

@Component({
  // TODO: routing fixen
  templateUrl: 'cursussen.component.html',
  styleUrls: ['cursussen.component.css']
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

//isVisible: boolean;
isVisibleOrganisatieCursus_post: boolean;
isVisibleCursus_put :boolean;
isVisibleCursusBeroepstaak_post:boolean;
isVisibleCursusBeroepstaak_delete:boolean;
isVisibleCursusProfessionalskill_post:boolean
isVisibleCursusProfessionalskill_delete:boolean;
isVisibleCursusLeerdoel_post:boolean;
isVisibleLeerdoel_delete:boolean;
isVisibleLeerdoel_put:boolean;
isVisibleCursusToets_post:boolean;
isVisibleToets_put:boolean;
isVisibleToets_delete:boolean;
isVisibleToetsBeoordelingsElement_post:boolean;
isVisibleBeoordelingsElement_put:boolean;
isVisibleBeoordelingsElement_delete:boolean;

isVisibleLeerdoelToetsElement_post:boolean;
isVisibleToetsElement_put:boolean;
isVisibleToetsElement_delete:boolean;

  constructor(private cursussenService: CursussenService,
              private docentenService: DocentenService,
              private beroepstaakService: BeroepstakenService,
              private professionalskillService: ProfessionalskillsService,
              private leerdoelenService: LeerdoelenService,
              private toetsenService: ToetsenService,
              private toetsmatrijzenService: ToetsmatrijzenService,
              private bloomniveauService: BloomniveausService,
              private millerNiveausService: MillerNiveausService,
              public authService: AuthService,
              private functieService : FunctieService,
              private afAuth: AngularFireAuth) {
    this.loading = true;
    this.afAuth.authState.subscribe((auth) => {
      // console.log("authstate updated//user changed");
      this.refreshDocenten();
      this.loadButtons();
    })
  }

  ngOnInit(): void {
      this.afAuth.authState.subscribe((auth) => {

    this.cursusForm = {};
    this.mode = 'view';
    this.toetsMatrijsEdit = 0;
    this.toetsMatrijsAdd = [];

    this.toetsMatrijsArray = Array.apply(null, Array(10));

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.cursussenService.getCursussen(token).subscribe(cursussen => {
        this.courses= cursussen;
        this.selectedCursus = this.courses[0];
        // console.log(  this.selectedCursus);
        this.cursusForm = this.courses[0];
        this.refreshAll();
      },
      error => // console.log('Error: ', error),
      () => {
        this.loading = false;
      });

      this.authService.maakTokenHeadervoorCurcon().then( token => {
        //// console.log(token);

        this.millerNiveausService.getMillerNiveaus(token).subscribe(millerNiveaus => {
          this.allMillerNiveaus = millerNiveaus;
        },
        error => // console.log('Error: ', error),
        () => {
          this.loading = false;
        });
      });
    });
  })
  }


  changeMode(mode) {
    this.refreshDocenten();
    this.mode = mode;
  }

  loadButtons() {
      var email= this.afAuth.auth.currentUser.email;
      //this.loading = true;
      this.authService.maakTokenHeadervoorCurcon().then( token => {
          this.functieService.getFunctiesByUser(email).subscribe(functies => {
              //TODO createbutton weghalen die altijd visible is vervangen door NgIF
            if (functies == null) {
              // console.log("je mag niks:)");
            } else {
                if (functies.some(f=> f.name == "organisatiecursus_post")) {
                   this.isVisibleOrganisatieCursus_post=true;
                }
                if (functies.some(f=> f.name == "cursus_put")) {
                   this.isVisibleCursus_put=true;
                }
                if (functies.some(f=> f.name == "cursusberoepstaak_post")) {
                   this.isVisibleCursusBeroepstaak_post=true;
                }
                if (functies.some(f=> f.name == "cursusberoepstaak_delete")) {
                   this.isVisibleCursusBeroepstaak_delete=true;
                }
                if (functies.some(f=> f.name == "cursusprofessional_post")) {
                   this.isVisibleCursusProfessionalskill_post=true;
                }
                if (functies.some(f=> f.name == "cursusprofessional_delete")) {
                   this.isVisibleCursusProfessionalskill_delete=true;
                }
                if (functies.some(f=> f.name == "cursusleerdoel_post")) {
                   this.isVisibleCursusLeerdoel_post=true;
                }
                if (functies.some(f=> f.name == "leerdoel_put")) {
                   this.isVisibleLeerdoel_put=true;
                }
                if (functies.some(f=> f.name == "leerdoel_delete")) {
                   this.isVisibleLeerdoel_delete=true;
                }
                if (functies.some(f=> f.name == "cursustoets_post")) {
                   this.isVisibleCursusToets_post=true;
                }
                if (functies.some(f=> f.name == "toets_put")) {
                   this.isVisibleToets_put=true;
                }
                if (functies.some(f=> f.name == "toets_delete")) {
                   this.isVisibleToets_delete=true;
                }
                if (functies.some(f=> f.name == "toetsbeoordelingselement_post")) {
                   this.isVisibleToetsBeoordelingsElement_post=true;
                }
                if (functies.some(f=> f.name == "beoordelingselement_put")) {
                   this.isVisibleBeoordelingsElement_put=true;
                }
                if (functies.some(f=> f.name == "beoordelingselement_delete")) {
                   this.isVisibleBeoordelingsElement_delete=true;
                }
                if (functies.some(f=> f.name == "leerdoeltoetselement_post")) {
                   this.isVisibleLeerdoelToetsElement_post=true;
                }
                if (functies.some(f=> f.name == "toetselement_put")) {
                   this.isVisibleToetsElement_put=true;
                }
                if (functies.some(f=> f.name == "toetselement_delete")) {
                   this.isVisibleToetsElement_delete=true;
                }



}
            //this.loading = false;
        });
      })
  }

  // ******************
  // Cursus operaties
  // ******************

  onSelect(cursus: Object) {
    this.onSelectedCourse.emit(cursus);
    this.selectedCursus = cursus;
    this.cursusForm = cursus;
    this.refreshAll();
    // console.log('onSelect(this.selectedCursus)');
    // console.log(this.selectedCursus);
  }

  saveCursus(form: any) {
    this.loading = true;
    const formValues = form.value;
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.cursussenService.updateCursus(this.selectedCursus.id, formValues, token).subscribe(data => {
        this.mode = 'view';
        this.refreshCursussen();
      });
    });
  }
  refreshCursussen(){
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      this.cursussenService.getCursussen(token).subscribe(cursussen => {
          // console.log(cursussen);
          this.courses= cursussen;
          let refreshCursus=cursussen.find(c=> c.id == this.selectedCursus.id);
          this.onSelect(refreshCursus);
          this.loading = false;
      });
    });
  }

  addCursus() {
    this.loading = true;
    // console.log(this.cursusForm);

    this.authService.maakTokenHeadervoorCurcon().then(token => {
      this.cursussenService.addCursus(this.cursusForm, token).subscribe(data => {
        this.mode = 'view';
        this.cursussenService.getCursussen(token).subscribe(cursussen => {
          this.courses=cursussen;
          //NOTE werkt alleen als het nieuwe object de laatste is(hoogste id)
           this.onSelect(this.courses[this.courses.length-1]);
            this.loading = false;
            this.cursusModal.hide();
          });
        });
    });
  }

  initializeCursusForm() {
    this.cursusForm = {};
    this.refreshDocenten();
  }

  // ******************
  // Professionalskill operaties
  // ******************
  deleteProfessionalskill(ps: Object) {
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      // console.log(token);

      this.cursussenService.deleteProfessionalskill(this.selectedCursus.id, ps['id'], token).subscribe(
        result => {this.refreshProfessionalskills();},
        error => {this.refreshProfessionalskills();}
      );
    });
  }

  deleteBeoordelingsElement(el) {
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.toetsenService.deleteBeoordelingselement(el['id'], token).subscribe(
        result => {this.refreshToetsen(); this.refreshToetsMatrijzen(); },
        error => {this.refreshToetsen(); this.refreshToetsMatrijzen(); }
      );
    });
  }

  getProfessionalskillTypes() {
    this.loading = true;

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.professionalskillService.getProfessionalskillsTypes(token).subscribe(result => {
        this.professionalskillsTypes = result;
        this.professionalskillForm = {activiteit: 6, niveau: 'T'};
        this.loading = false;
      });
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

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.professionalskillService.getProfessionalskills(token).subscribe(results => {
        this.allProfessionalskills=results;
        for (let i = 0; i < this.selectedCursus.professionalskills.length; i++) {
          this.allProfessionalskills = this.allProfessionalskills.filter((x) => x.id !== this.selectedCursus.professionalskills[i].id);
        }
        this.loading = false;
      });
    });
  }

  addProfessionalskill() {
    this.loading = true;
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.professionalskillService.getProfessionalskillId(this.professionalskillForm.activiteit, this.professionalskillForm.niveau, token).subscribe(data => {
        this.cursussenService.addProfessionalskillToCursus(this.selectedCursus.id, data, token).subscribe(x => {
          this.professionalskillModal.hide();
          this.refreshProfessionalskills();
          this.loading = false;
        });
      });
  });
  }

//   addProfessionalskills() {
//     const selected = this.allProfessionalskills.filter((x) => x.selected);
//     this.error = false;
//
//     if (selected.length === 0) {
//       this.error = true;
//     }
//
//     if (!this.error) {
//       //Dubieus: firebase meerdere keren aanroepen in een for loop is of de client laten itereren terwijl het token ongeldig is
//       this.authService.maakTokenHeadervoorCurcon().then( token => {
//         for (let i = 0; i < selected.length; i++) {
//
//
//           this.cursussenService.addProfessionalskillToCursus(this.selectedCursus.id, selected[i], token).subscribe(x => {
//             this.professionalskillModal.hide();
//             this.refreshProfessionalskills();
//           });
// <<<<<<< HEAD
//         }
//       }
//       });
//     }
//   }

  // 	******************
  // 	Beroepstaak operaties
  // 	******************

  addBeroepstaak() {
    this.loading = true;
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.beroepstaakService.getBeroepstaakId(this.beroepstakenForm.activiteit, this.beroepstakenForm.architectuurlaag,
        this.beroepstakenForm.niveau, token).subscribe(data => {
          this.authService.maakTokenHeadervoorCurcon().then( token => {
            //// console.log(token);
            this.cursussenService.addBeroepstakenToCursus(this.selectedCursus.id, data, token).subscribe(x => {
              this.beroepstaakModal.hide();
              this.refreshBeroepstaken();
              this.loading = false;
            });
          });
      });
    });
  }

  deleteBeroepstaak(bt: Object) {
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      this.cursussenService.deleteBeroepstaak(this.selectedCursus.id, bt['id'], token).subscribe(
        result => {this.refreshBeroepstaken(); },
        error => {this.refreshBeroepstaken(); }
      );
    });
  }

  getBeroepstaakTypes() {
    this.loading = true;

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.beroepstaakService.getBeroepstaakTypes(token).subscribe(result => {
        this.beroepstakenTypes = result;
        this.beroepstakenForm = {architectuurlaag: 1, activiteit: 1, niveau: 1};
        this.loading = false;
      });
    });
  }

  getAllBeroepstaken() {
    this.loading = true;

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.beroepstaakService.getBeroepstaken(token).subscribe(result => {
        this.allBeroepstaken = result;
        for (let i = 0; i < this.selectedCursus.beroepstaken.length; i++) {
          this.allBeroepstaken = this.allBeroepstaken.filter((x) => x.id !== this.selectedCursus.beroepstaken[i].id);
        }
        this.loading = false;
      });
    });
  }

  // 	******************
  // 	Leerdoel operaties
  // 	******************

  initializeLeerdoelForm() {
    this.loading = true;
    this.leerdoelForm = {};

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.bloomniveauService.getBloomniveaus(token).subscribe(data => {
        this.allBloomniveaus=data;
        let selectedBeroepstaak = 0;
        if (this.selectedCursus.beroepstaken.length > 0) {
          selectedBeroepstaak = this.selectedCursus.beroepstaken[0].id;
        }
        let selectedProfessionalSkill = 0;
        if (this.selectedCursus.professionalskills.length > 0) {
          selectedProfessionalSkill = this.selectedCursus.professionalskills[0].id;
        }
        this.leerdoelForm = {
          eindBT: selectedBeroepstaak,
          eindPS: selectedProfessionalSkill,
          bloomniveau: data[0].id,
          gewicht: 0.0,
          omschrijving: ''
        };
        this.loading = false;
      });
    });
  }

  initializeLeerdoelModal(leerdoel) {
    // console.log('leerdoel');
    // console.log(leerdoel);
    // console.log('this.selectedCursus.professionalskills');
    // console.log(this.selectedCursus.professionalskills);
    this.leerdoelModal.show();
    this.loading = true;
    if (this.allBloomniveaus == null) {
      this.authService.maakTokenHeadervoorCurcon().then( token => {
        //// console.log(token);

        this.bloomniveauService.getBloomniveaus(token).subscribe(bloomniveaus => {
          this.allBloomniveaus=bloomniveaus;
        });
      });
    };
    this.leerdoelForm = {
      id: leerdoel.id,
      eindBT: leerdoel.eindBT.id,
      eindPS: leerdoel.eindPS.id,
      bloomniveau: leerdoel.bloomniveau.id,
      gewicht: leerdoel.gewicht,
      omschrijving: leerdoel.omschrijving
    };
    // console.log('leerdoelForm');
    // console.log(this.leerdoelForm);
    this.loading = false;
  }

  saveLeerdoel() {
    this.loading = true;

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.cursussenService.saveLeerdoel(this.selectedCursus.id, this.leerdoelForm, token).subscribe(x => {
        this.refreshLeerdoelen();
        this.refreshToetsMatrijzen();
        this.closeModal(this.leerdoelModal);
      });
    });
  }

  deleteLeerdoel(ld: Object) {
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.cursussenService.deleteLeerdoel(ld['id'], token).subscribe(
        result => {this.refreshLeerdoelen(); this.refreshToetsMatrijzen(); },
        error => {this.refreshLeerdoelen(); this.refreshToetsMatrijzen();
      });
    });
  }


  // 	******************
  // 	Toets operaties
  // 	******************

  newToetsForm() {
    // console.log('newToetsForm()');
    this.toetsForm = {
      naam: '',
      millerNiveau: this.allMillerNiveaus[0].id,
      gewicht: 50.0,
      omschrijving: ''
    };
  }

  editToetsForm(toets) {
    // console.log('editToetsForm(toets)');
    // console.log(toets);
    this.toetsForm = {
      id: toets.id,
      naam: toets.naam,
      gewicht: toets.gewicht,
      millerNiveau: toets.millerNiveau.id
    };
  }

  saveToets() {
    this.loading = true;
    // console.log(this.toetsForm);
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      this.cursussenService.saveToets(this.selectedCursus.id, this.toetsForm, token).subscribe(x => {
        this.refreshToetsen();
        this.refreshToetsMatrijzen();
        this.toetsModal.hide();
        this.loading = false;
      });
    });
  }

  deleteToets(to: Object) {
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.cursussenService.deleteToets(to['id'], token).subscribe(
        result => {this.refreshToetsen(); this.refreshToetsMatrijzen(); },
        error => {this.refreshToetsen(); this.refreshToetsMatrijzen();
      });
    });
  }

  initializeBeoordelingselementModal(beoordelingselement) {
    // console.log(beoordelingselement);
    this.beoordelingselementModal.show();
    this.loading = true;
    this.beoordelingselementForm = {
      naam: beoordelingselement.naam,
      id: beoordelingselement.id,
      gewicht: beoordelingselement.gewicht,
      omschrijving: beoordelingselement.omschrijving
    };
    this.loading = false;
  }

  saveBeoordelingselement(element) {
    this.loading = true;
    // console.log(element);

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.toetsenService.saveBeoordelingsElement(this.toetsEdit.id, element, token).subscribe(data => {
        this.refreshToetsen();
        this.refreshToetsMatrijzen();
        this.beoordelingselementModal.hide();
        this.loading = false;
      });
    });
  }

  checkbox(item) {
    item.selected = (item.selected) ? false : true;
  }

  editCell(id, gewicht) {
    if (id != null) {
      this.toetsMatrijsAdd = [];
    }
    this.toetsMatrijsEdit = id;
    this.toetsMatrijsEditForm.gewicht = gewicht;
  }

  addCell(item) {
    if (item != null) {
      this.toetsMatrijsAdd = item;
      // console.log('addCell - this.toetsMatrijsAdd');
      // console.log(this.toetsMatrijsAdd);
      this.toetsMatrijsAddForm = {};
      this.toetsMatrijsAddForm.beoordelingsElement = item.beoordelingselement;
      // console.log('addCell - this.toetsMatrijsAddForm');
      // console.log(this.toetsMatrijsAddForm);
    }
    this.toetsMatrijsEdit = 0;

  }

  editToetsElement() {
    this.loading = true;
    // console.log(this.toetsMatrijsAdd);
    // console.log(this.toetsMatrijsAddForm);
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);
      this.cursussenService.editToetsElement(this.toetsMatrijsEdit, this.toetsMatrijsEditForm, token).subscribe(x => {
        this.refreshToetsMatrijzen();
        this.toetsMatrijsEdit = 0;
        this.loading = false;
      });
  });
  }

  addToetsElement() {
    this.loading = true;
    this.toetsMatrijsAddForm.beoordelingsElement = this.toetsMatrijsAdd.beoordelingselement.id;
    // console.log('addToetsElement - this.toetsMatrijsAdd');
    // console.log(this.toetsMatrijsAdd);
    // console.log('this.toetsMatrijsAddForm');
    // console.log(this.toetsMatrijsAddForm);

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      this.cursussenService.addToetsElement(this.toetsMatrijsAdd.leerdoel.id, this.toetsMatrijsAddForm, token).subscribe(x => {
        this.refreshToetsMatrijzen();
        this.toetsMatrijsAdd = {};
        this.loading = false;
      });
  });
  }

  deleteToetsElement() {
    this.loading = true;

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      this.cursussenService.deleteToetsElement(this.toetsMatrijsEdit, token).subscribe(x => {
        this.refreshToetsMatrijzen();
        this.toetsMatrijsEdit = 0;
        this.loading = false;
      });
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
    let self = this;
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      this.docentenService.getDocenten(token).subscribe(docenten => {
        this.allDocenten=docenten;
        this.loading = false;
      }
    );
    });
  }

  refreshBeroepstaken() {
    this.loading = true;

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.beroepstaakService.getBeroepstakenByObject(this.selectedCursus.eindBT, token).subscribe(beroepstaken => {
        this.selectedCursus.beroepstaken = beroepstaken;
        // console.log('selectedCursus.beroepstaken');
        // console.log(this.selectedCursus.beroepstaken);
        this.loading = false;
      });
    });
  }

  refreshProfessionalskills() {
    this.loading = true;

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.professionalskillService.getProfessionalskillsByObject(this.selectedCursus.eindPS, token).subscribe(professionalskills => {
        this.selectedCursus.professionalskills = professionalskills;
        this.loading = false;
      });
    });
  }

  refreshLeerdoelen() {
    // TODO header meegeven
    this.loading = true;

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.leerdoelenService.getLeerdoelenByObject(this.selectedCursus.leerdoelen, token).subscribe(leerdoelen => {
        this.selectedCursus.leerdoelenLijst = leerdoelen;
        this.loading = false;
        },
      );
    });
  }

  refreshToetsen() {
    this.loading = true;

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.toetsenService.getToetsenByObject(this.selectedCursus.toetsen, token).subscribe(toetsen => {
        this.selectedCursus.toetsenLijst = toetsen;
        this.loading = false;
      });
    });
  }

  refreshToetsMatrijzen() {
    this.loading = true;

    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //// console.log(token);

      this.toetsmatrijzenService.getToetsmatrijzenById(this.selectedCursus.id, token).subscribe(toetsmatrijs => {
        // console.log('refreshToetsMatrijzen toetsmatrijs');
        // console.log(toetsmatrijs);
        if (this.toetsMatrijsArray !== undefined) {
          while (this.toetsMatrijsArray.length > 0) {
            this.toetsMatrijsArray.splice(0, 1);
            // console.log(this.toetsMatrijsArray.length);
            // console.log('toetsMatrijsArray.length');
          }
        }
        let toetsIndex = 0;
        for (let toets of toetsmatrijs.toetsen) {
          // console.log(toets);
          this.toetsMatrijsArray[toetsIndex] = this.buildToetsMatrijs(toets, toetsmatrijs.leerdoelen);
          toetsIndex++;
        }
        // console.log('this.toetsMatrijsArray');
        // console.log(this.toetsMatrijsArray);
        this.loading = false;
      });
    });
  }

  buildToetsMatrijs(toets, leerdoelen) {
    const toetsMatrijs = new ToetsMatrijs();
    toetsMatrijs.naam = toets.naam;
    let totalCols = 0;
    if (toets.beoordelingsElementen != null) {
      totalCols = toets.beoordelingsElementen.length;
      toetsMatrijs.beoordelingselementArray = Array.apply(null, Array(totalCols));
      toetsMatrijs.totaalGewichtElementArray = Array.apply(null, Array(totalCols));
      let index = 0;
      for (let element of toets.beoordelingsElementen) {
        toetsMatrijs.beoordelingselementArray[index] = element;
        toetsMatrijs.totaalGewichtElementArray[index] = 0;
        index++;
      }
    }

    let totalRows = 0;
    if (leerdoelen != null) {
      totalRows = leerdoelen.length;
      toetsMatrijs.totaalGewichtLeerdoelArray = Array.apply(null, Array(leerdoelen.length));
    }
    // console.log('toetsMatrijs.beoordelingselementArray');
    // console.log(toetsMatrijs.beoordelingselementArray);
    // console.log('Total rows:' + totalRows);
    // console.log('Total cols:' + totalCols);

    // grid aanmaken
    toetsMatrijs.grid = Array.apply(null, null);
    const grid = Array.apply(null, Array(totalRows));
    for (let i = 0; i < grid.length; i++) {
      grid[i] = Array.apply(null, Array(totalCols));
    }
    // console.log('Grid aangemaakt');
    for (let row = 0; row < leerdoelen.length; row++) {
      toetsMatrijs.totaalGewichtLeerdoelArray[row] = 0;
      for (let col = 0; col < totalCols; col++) {
        const toetsElement = {
          beoordelingselement: toetsMatrijs.beoordelingselementArray[col],
          leerdoel: leerdoelen[row],
          id: 0,
          gewicht: 0
        };
        grid[row][col] = toetsElement;
        for (let p = 0; p < leerdoelen[row].toetsElementen.length; p++) {
          // totalGewicht +=
          // toetsmatrijs.leerdoelen[row].toetsElementen[p].gewicht;
          let beoordelingsElementId = leerdoelen[row].toetsElementen[p].beoordelingsElement.id;
          if (beoordelingsElementId == toetsMatrijs.beoordelingselementArray[col].id) {
            grid[row][col] = leerdoelen[row].toetsElementen[p];
            toetsMatrijs.totaalGewichtLeerdoelArray[row] = toetsMatrijs.totaalGewichtLeerdoelArray[row] + leerdoelen[row].toetsElementen[p].gewicht;
            toetsMatrijs.totaalGewichtElementArray[col] =
              toetsMatrijs.totaalGewichtElementArray[col] +
              leerdoelen[row].toetsElementen[p].gewicht;
          }
        }
        // console.log('grid[row][col]');
        // console.log(grid[row][col]);
      }
    }
    toetsMatrijs.grid = grid;
    // console.log('toetsMatrijs');
    // console.log(toetsMatrijs);
    return toetsMatrijs;
  }


  refreshAll() {
    this.refreshBeroepstaken();
    this.refreshProfessionalskills();
    this.refreshLeerdoelen();
    this.refreshToetsen();
    this.refreshToetsMatrijzen();
    // console.log(this.selectedCursus);
  }

  closeModal(modal) {
    this.loading = false;
    modal.hide();
  }

  isEmptyObject(obj) {
    return (Object.keys(obj).length === 0);
  }
}
