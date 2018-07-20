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
  	// selector: 'app-b-user',
  	templateUrl: './b-rol.component.html',
  	// styleUrls: ['./b-user.component.css']
})

export class BRolComponent implements OnInit {
  @ViewChild('roleModal') roleModal: any;
  loading: boolean;
  naam: string;
  error: boolean;
  mode: string;

  roleForm = <any>{};
  @Input() roles: Array<any>;
  @Output() onSelectedRole = new EventEmitter<Object>();
  selectedRole = <any>{};

  @Input() modules: Array<any>;
  @ViewChild('ModuleModal') moduleModal: any;
  availableModules: Array<any>;
  allModules: Array<any>;
  moduleForm = <any>{};

  isVisibleRoleModule_post : boolean;
  isVisibleRoleModule_delete : boolean;

  isVisibleRole_put : boolean;
  isVisibleRole_post : boolean;
  isVisibleRole_delete : boolean;

  	constructor(public authService: AuthService, private userService : UserService, private rolService : RolService, private moduleService : ModuleService, private functieService : FunctieService, private afAuth: AngularFireAuth) {
    	//this.loading = true;
    	this.modules = [];

    	this.afAuth.authState.subscribe((auth) => {
    		this.loadButtons();
    		this.loadRoles();
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
	        		// console.log("je mag niets uitvoeren)");
	      		} else {
	        		if (functies.some(f=> f.name == "rolemodule_post")) {
	          			this.isVisibleRoleModule_post = true;
	        		}

        			if (functies.some(f=> f.name == "rolemodule_delete")) {
	          			this.isVisibleRoleModule_delete=true;
	        		}

		        	if (functies.some(f=> f.name == "role_put")) {
		          		this.isVisibleRole_put = true;
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

	initializeRoleForm() {
	  	this.roleForm = {};
	  	// this.refreshModules();
	}

	initializeModuleForm() {
  		// console.log(this.selectedRole);
		this.modules = this.selectedRole.moduleArr;
    	this.loading = true;

  		this.authService.maakTokenHeadervoorCurcon().then( token => {
   			this.moduleForm = {};
    		this.moduleService.getModules(token).subscribe(data => {
	          	this.allModules=data;
          		let selectedModule = this.modules[0];
          		this.moduleForm = {module: selectedModule};
          		this.availableModules = this.allModules;

          		// console.log(this.modules);
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

	onSelect(rol: Object) {
	  	this.onSelectedRole.emit(rol);
	  	this.selectedRole = rol;
	  	this.roleForm = rol;
	  	this.refreshModules();
	  	//// console.log('onSelect(this.selectedCursus)');
	  	//// console.log(this.selectedCursus);
	}

	addRole() {
	  	this.loading = true;
	  	// console.log(this.roleForm);
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
	  		this.rolService.addRole(this.roleForm.name,token).subscribe(x => {
	        	this.mode = 'view';
	        	this.rolService.getRoles(token).subscribe(roles => {
	          		this.roles = roles;

	          		//this.onSelect(this.courses[this.courses.length-1]);
	            	this.loading = false;
	            	this.roleModal.hide();
	          	});
	    	});
	  	});
	}

	saveRole(form: any) {
	  	this.loading = true;
	  	// const formValues = form.value;

	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
	    	//// console.log(token);
	    	// console.log(form.value);

	    	this.rolService.updateRole(this.selectedRole.id, form.value, token).subscribe(data => {
	      		this.mode = 'view';
	      		this.refreshRoles();
	    	});
	  	});
	}

	loadRoles() {
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
		    this.rolService.getRoles(token).subscribe(roles => {
		      	// console.log(roles);
		      	this.roles= roles;
		      	this.selectedRole = this.roles[0];
		      	this.roleForm = this.roles[0];
		      	this.refreshModules();
		    });
	  	});
	}

  refreshRoles() {
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
		    this.rolService.getRoles(token).subscribe(roles => {
		      	// console.log(roles);
		      	this.roles= roles;
            let refreshRol=roles.find(r=> r.id == this.selectedRole.id);

            this.onSelect(refreshRol);
            this.loading = false;
		    });
	  	});
	}


	refreshModules() {
	  	this.loading = true;

	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
		    this.moduleService.getModulesByObject(this.selectedRole.modules, token).subscribe(modules => {
		      	this.selectedRole.moduleArr = modules;
		      	// console.log('selectedRole.moduleArr');
		      	// console.log(this.selectedRole.moduleArr);
		      	this.loading = false;
		    });
	  	});
	}

	addModuleToRol(form: any) {
	    this.loading = true;

		this.authService.maakTokenHeadervoorCurcon().then( token => {
	      	this.rolService.addModuleToRole(this.selectedRole.id, form, token).subscribe(data => {
	        	this.moduleModal.hide();
	          	// this.cursusForm = data;
	          	this.onSelect(this.selectedRole);

	          	this.loading = false;
	      	});
	  	});
	}

	deleteRole() {
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
	    	this.rolService.deleteRole(this.selectedRole.id, token).subscribe(
		      	result => {this.loadRoles(); },
		      	error => {this.loadRoles(); }
		    );
	  	});
	}

	deleteModuleFromRole(md: Object) {
    // console.log(md);
	 	this.authService.maakTokenHeadervoorCurcon().then( token => {
	    	this.rolService.deleteModuleFromRole(this.selectedRole.id, md['id'], token).subscribe(
	      		result => {this.refreshModules(); },
	      		error => {this.refreshModules(); }
	    	);
	  	});
	}


}
