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
  	@Input() roles: Array<any>;
  	@Output() onSelectedRole = new EventEmitter<Object>();
  	//Allroles
  	selectedRole = <any>{};


	@Input() modules: Array<any>;
  	@ViewChild('ModuleModal') moduleModal: any;
  	availableModules: Array<any>;
  	allModules: Array<any>;
	moduleForm = <any>{};

  	constructor(public authService: AuthService, private userService : UserService, private rolService : RolService, private moduleService : ModuleService, private functieService : FunctieService, private afAuth: AngularFireAuth) {
    	//this.loading = true;
    	this.modules = [];
    	
    	this.afAuth.authState.subscribe((auth) => {
    		this.loadButtons();
    		this.loadRoles();
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

	initializeUserForm() {
	  	this.userForm = {};
	  	// this.refreshRollen();
	}
	
	initializeCursusForm() {
  		console.log(this.selectedRole);
		this.modules = this.selectedRole.moduleArr;
    	this.loading = true;
    	
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
	
	onSelect(rol: Object) {
	  	this.onSelectedRole.emit(rol);
	  	this.selectedRole = rol;
	  	this.userForm = rol;
	  	this.refreshModules();
	  	//console.log('onSelect(this.selectedCursus)');
	  	//console.log(this.selectedCursus);
	}

	addRole() {
	  	this.loading = true;
	  	console.log(this.userForm);
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
	  		this.rolService.addRole(this.userForm.email,token).subscribe(user => {
	        	this.mode = 'view';
	        	this.rolService.getRoles(token).subscribe(roles => {
	          		this.roles = roles;
	
	          		//this.onSelect(this.courses[this.courses.length-1]);
	            	this.loading = false;
	            	this.cursusModal.hide();
	          	});
	    	});
	  	});
	}
	
	saveRole(form: any) {
	  	this.loading = true;
	  	// const formValues = form.value;
	  	
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
	    	//console.log(token);
	    	console.log(form.value);
	    
	    	this.rolService.updateRole(this.selectedRole.id, form.value, token).subscribe(data => {
	      		this.mode = 'view';
	      		this.loadRoles();
	      		
	      		this.rolService.getRolesByObject(this.selectedRole,token).subscribe(role => {
	        		console.log(role);
	        		this.onSelect(role);
	        		this.loading = false;
	        		this.cursusModal.hide();
	      		});
	    	});
	  	});
	}

	loadRoles() {
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
	    	//console.log(token);
	
		    this.rolService.getRoles(token).subscribe(roles => {
		      	console.log(roles);
		      	this.roles= roles;
		      	this.selectedRole = this.roles[0];
		      	this.userForm = this.roles[0];
		      	this.refreshModules();
		    });
	  	});
	}




	refreshModules() {
	  	this.loading = true;
	
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
		    this.moduleService.getModulesByObject(this.selectedRole.modules, token).subscribe(modules => {
		      	this.selectedRole.moduleArr = modules;
		      	console.log('selectedCursus.moduleArr');
		      	console.log(this.selectedRole.moduleArr);
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

	deleteRole(md: Object) {
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
	    	this.rolService.deleteRole(this.selectedRole.id, token).subscribe(
		      	result => {this.refreshModules(); },
		      	error => {this.refreshModules(); }
		    );
	  	});
	}
	
	deleteModuleFromRole(md: Object) {
	 	this.authService.maakTokenHeadervoorCurcon().then( token => {
	    	this.rolService.deleteModuleFromRole(this.selectedRole.id, md['id'], token).subscribe(
	      		result => {this.refreshModules(); },
	      		error => {this.refreshModules(); }
	    	);
	  	});
	}


}
