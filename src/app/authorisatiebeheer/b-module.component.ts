import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {AuthService} from '../providers/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {FunctieService } from '../services/functie.service';
import {UserService} from '../services/user.service';
import {RolService} from '../services/rol.service';
import {ModuleService} from '../services/module.service';

@Component({
  // selector: 'app-b-module',
  templateUrl: './b-module.component.html',
  // styleUrls: ['./b-module.component.css']
})
export class BModuleComponent implements OnInit {
  @ViewChild('moduleModal') moduleModal: any;
  // allRoles: Array<any>;
  // rolesByUser: Array<any>;
  // functies: Array<any>;
  loading: boolean;
  naam: string;
  error: boolean;
  //
  mode: string;

  moduleForm = <any>{};

  //FIXME deze boolean zijn nog niet aan html gekoppeld+check
  isVisibleUser_get : boolean;
  isVisibleUser_post : boolean;
  isVisibleUser_delete : boolean;

  isVisibleRole_get : boolean;
  isVisibleRole_post : boolean;
  isVisibleRole_delete : boolean;
  //Cursuscopy
  @Input() modules: Array<any>;
  @Output() onSelectedModule = new EventEmitter<Object>();
  selectedModule = <any>{};


	@Input() functions: Array<any>;
  @ViewChild('functieModal') functieModal: any;
  availableFunctions: Array<any>;
  allFunctions: Array<any>;
	functionForm = <any>{};

  constructor(public authService: AuthService, private userService : UserService, private rolService : RolService, private moduleService : ModuleService, private functieService : FunctieService, private afAuth: AngularFireAuth) {
    //this.loading = true;
    this.functions = [];
    //
    this.afAuth.authState.subscribe((auth) => {
    this.loadButtons();
    this.loadModules();
    // this.refreshFunctions();
  })
}

ngOnInit() {
  this.mode = 'view';
}

loadButtons() {
  var email= this.afAuth.auth.currentUser.email;
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.functieService.getFunctiesByUser(email).subscribe(functies => {
      if (functies == null) {
        console.log("je mag niets uitvoeren)");
      } else {
        if (functies.some(f=> f.name == "user_get")) {
          this.isVisibleUser_get = true;
        }

        if (functies.some(f=> f.name == "user_post")) {
          this.isVisibleUser_post=true;
        }

        if (functies.some(f=> f.name == "user_delete")) {
          this.isVisibleUser_delete = true;
        }

        if (functies.some(f=> f.name == "role_get")) {
          this.isVisibleRole_get = true;
        }

        if (functies.some(f=> f.name == "role_post")) {
          this.isVisibleRole_post = true;
        }

        if (functies.some(f=> f.name == "role_delete")) {
          this.isVisibleRole_delete = true;
        }
      }
    });
  })
}

initializeModuleForm(){
  this.moduleForm = {};
  // this.refreshRollen();
}
initializeFunctionForm() {
  console.log(this.selectedModule);
this.functions = this.selectedModule.functionArr;
    this.loading = true;
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.functionForm = {};
      //console.log(this.functions);
    this.functieService.getFuncties(token).subscribe(data => {

          //changed
          this.availableFunctions=null;
          this.allFunctions=data;
      // End change

          let selectedModule = this.functions[0];
          this.functionForm = {module: selectedModule};
          this.availableFunctions = this.allFunctions;

          console.log(this.functions);
          for (let f of this.functions) {
              this.availableFunctions = this.availableFunctions.filter((x) => x.id !== f.id);
          }

          var id = 0;
          if (this.availableFunctions.length > 0){
              id = this.availableFunctions[0].id;
          }
          this.functionForm = {id: id};
          this.loading = false;
    });
  });

}

changeMode(mode) {
  this.mode = mode;
  this.refreshFunctions(); //NOTE Is dit nodig?
}
closeModal(modal) {
  this.loading = false;
  modal.hide();
}
onSelect(module: Object) {
  this.onSelectedModule.emit(module);
  this.selectedModule = module;
  this.moduleForm = module;
  this.refreshFunctions();
  console.log('onSelect(this.selectedModule)');
  console.log(this.selectedModule);
}

addModule() {
  this.loading = true;
  console.log(this.moduleForm);
  this.authService.maakTokenHeadervoorCurcon().then( token => {
      this.moduleService.addModule(this.moduleForm.name,token).subscribe(x => {
        this.mode = 'view';
        this.moduleService.getModules(token).subscribe(modules => {
          this.modules=modules;

          // this.onSelect(this.modules[this.modules.length-1]);
            this.loading = false;
            this.moduleModal.hide();
          });
    });
  });
}
saveModule(form: any) {
  this.loading = true;
  // const formValues = form.value;
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    //console.log(token);
    console.log(form.value);
    this.moduleService.updateModule(this.selectedModule.id, form.value, token).subscribe(data => {
      this.mode = 'view';
      this.loadModules();
      this.moduleService.getModulesByObject(this.selectedModule,token).subscribe(module => {
        console.log(module);
        this.onSelect(module);
        this.loading = false;
        // this.moduleModal.hide();
      });
    });
  });
}

loadModules(){
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    //console.log(token);

    this.moduleService.getModules(token).subscribe(modules => {
      console.log(modules);
      this.modules= modules;
      this.selectedModule = this.modules[0];
      this.moduleForm = this.modules[0];
      this.refreshFunctions();
    });
  });
}




refreshFunctions() {
  this.loading = true;

  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.functieService.getFunctiesByObject(this.selectedModule.functions, token).subscribe(functions => {
      this.selectedModule.functionArr = functions;
      console.log('selectedModule.functionArr');
      console.log(this.selectedModule.functionArr);
      this.loading = false;
    });
  });
}

addFunctionToModule(form: any) {
    this.loading = true;
this.authService.maakTokenHeadervoorCurcon().then( token => {
      this.moduleService.addFunctieToModule(this.selectedModule.id, form, token).subscribe(data => {
        this.functieModal.hide();
          // this.cursusForm = data;
          this.onSelect(this.selectedModule);

          this.loading = false;
      });
  });
}

//TODO button in html +testen
deleteModule(md: Object) {
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.moduleService.deleteModule(this.selectedModule.id, token).subscribe(
      //FIXME Refresh de module niet function
      result => {this.refreshFunctions(); },
      error => {this.refreshFunctions(); }
    );
  });
}

deleteFunctionFromModule(md: Object) {
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.moduleService.deleteFunctieFromModule(this.selectedModule.id, md['id'], token).subscribe(
      result => {this.refreshFunctions(); },
      error => {this.refreshFunctions(); }
    );
  });
}

}
