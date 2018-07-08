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
  @ViewChild('cursusModal') cursusModal: any;
  allRoles: Array<any>;
  rolesByUser: Array<any>;
  functies: Array<any>;
  loading: boolean;
  naam: string;
  error: boolean;
  //
  mode: string;

  userForm = <any>{};

  //FIXME deze boolean zijn nog niet aan html gekoppeld+check
  isVisibleUser_get : boolean;
  isVisibleUser_post : boolean;
  isVisibleUser_delete : boolean;

  isVisibleRole_get : boolean;
  isVisibleRole_post : boolean;
  isVisibleRole_delete : boolean;
  //Cursuscopy
  @Input() courses: Array<any>;
  @Output() onSelectedCourse = new EventEmitter<Object>();
  //Allroles
  selectedCursus = <any>{};


	@Input() modules: Array<any>;
  @ViewChild('ModuleModal') moduleModal: any;
  availableModules: Array<any>;
  allModules: Array<any>;
	moduleForm = <any>{};

  constructor(public authService: AuthService, private userService : UserService, private rolService : RolService, private moduleService : ModuleService, private functieService : FunctieService, private afAuth: AngularFireAuth) {
    //this.loading = true;
    this.modules = [];
    //
    this.afAuth.authState.subscribe((auth) => {
    this.loadButtons();
    this.loadcursussen();
    // this.refreshModules();
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

initializeUserForm(){
  this.userForm = {};
  // this.refreshRollen();
}
initializeCursusForm() {
  console.log(this.selectedCursus);
this.modules = this.selectedCursus.moduleArr;
    this.loading = true;
//<<<<<<< HEAD
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.moduleForm = {};
      //console.log(this.modules);
    this.moduleService.getModules(token).subscribe(data => {

          //changed
          this.availableModules=null;
          this.allModules=data;
      // End change

          let selectedModule = this.modules[0];
          this.moduleForm = {module: selectedModule};
          this.availableModules = this.allModules;

          console.log(this.modules);
          for (let m of this.modules) {
              this.availableModules = this.availableModules.filter((x) => x.id !== m.id);
          }

          var id = 0;
          if (this.availableModules.length > 0){
              id = this.availableModules[0].id;
          }
          this.moduleForm = {id: id};
          this.loading = false;
    });
  });

}

changeMode(mode) {
  this.mode = mode;
  this.refreshModules(); //NOTE Is dit nodig?
}
closeModal(modal) {
  this.loading = false;
  modal.hide();
}
onSelect(cursus: Object) {
  this.onSelectedCourse.emit(cursus);
  this.selectedCursus = cursus;
  this.userForm = cursus;
  this.refreshModules();
  console.log('onSelect(this.selectedCursus)');
  console.log(this.selectedCursus);
}

addCursus() {
  this.loading = true;
  console.log(this.userForm);
  this.authService.maakTokenHeadervoorCurcon().then( token => {
      this.moduleService.addModule(this.userForm.module,token).subscribe(user => {
        this.mode = 'view';
        this.moduleService.getModules(token).subscribe(cursussen => {
          this.courses=cursussen;

          // this.onSelect(this.courses[this.courses.length-1]);
            this.loading = false;
            this.cursusModal.hide();
          });
    });
  });
}
saveCursus(form: any) {
  this.loading = true;
  // const formValues = form.value;
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    //console.log(token);
    console.log(form.value);
    this.moduleService.updateModule(this.selectedCursus.id, form.value, token).subscribe(data => {
      this.mode = 'view';
      this.loadcursussen();
      this.moduleService.getModulesByObject(this.selectedCursus,token).subscribe(cursus => {
        console.log(cursus);
        this.onSelect(cursus);
        this.loading = false;
        this.cursusModal.hide();
      });
    });
  });
}

loadcursussen(){
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    //console.log(token);

    this.moduleService.getModules(token).subscribe(cursussen => {
      console.log(cursussen);
      this.courses= cursussen;
      this.selectedCursus = this.courses[0];
      this.userForm = this.courses[0];
      this.refreshModules();
    });
  });
}




refreshModules() {
  this.loading = true;

  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.moduleService.getModulesByObject(this.selectedCursus.modules, token).subscribe(modules => {
      this.selectedCursus.moduleArr = modules;
      console.log('selectedCursus.moduleArr');
      console.log(this.selectedCursus.moduleArr);
      this.loading = false;
    });
  });
}

addFunctieToModule(form: any) {
    this.loading = true;
this.authService.maakTokenHeadervoorCurcon().then( token => {
      this.moduleService.addFunctieToModule(this.selectedCursus.id, form, token).subscribe(data => {
        this.moduleModal.hide();
          // this.cursusForm = data;
          this.onSelect(this.selectedCursus);

          this.loading = false;
      });
  });
}

deleteModule(md: Object) {
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.moduleService.deleteModule(this.selectedCursus.id, token).subscribe(
      result => {this.refreshModules(); },
      error => {this.refreshModules(); }
    );
  });
}

deleteFunctieFromModule(md: Object) {
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.moduleService.deleteFunctieFromModule(this.selectedCursus.id, md['id'], token).subscribe(
      result => {this.refreshModules(); },
      error => {this.refreshModules(); }
    );
  });
}

}
