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
  // selector: 'app-b-function',
  templateUrl: './b-function.component.html',
  // styleUrls: ['./b-function.component.css']
})
export class BFunctionComponent implements OnInit {
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
  	isVisibleFunction_get : boolean;
  	isVisibleFunction_post : boolean;
  	isVisibleFunction_delete : boolean;

  	//Cursuscopy
  	@Input() functions: Array<any>;
  	@Output() onSelectedFunction = new EventEmitter<Object>();
  	//Allroles
  	selectedFunction = <any>{};


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
    		this.loadFunctions();
    		//this.refreshModules();
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
		        if (functies.some(f=> f.name == "function_get")) {
		          this.isVisibleFunction_get = true;
		        }
		
		        if (functies.some(f=> f.name == "function_post")) {
		          this.isVisibleFunction_post=true;
		        }
		
		        if (functies.some(f=> f.name == "function_delete")) {
		          this.isVisibleFunction_delete = true;
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
  		console.log(this.selectedFunction);
		this.modules = this.selectedFunction.moduleArr;
    	this.loading = true;

  		this.authService.maakTokenHeadervoorCurcon().then( token => {
    		this.moduleForm = {};
      		//console.log(this.modules);
    		this.functieService.getFuncties(token).subscribe(data => {

          		//changed
          		this.availableModules=null;
          		this.allModules=data;
      			// End change

          		let selectedFunction = this.functions[0];
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
  		//this.refreshModules(); //NOTE Is dit nodig?
	}
	
	closeModal(modal) {
	  	this.loading = false;
	  	modal.hide();
	}

	onSelect(function: Object) {
	  	this.onSelectedCourse.emit(function);
	  	this.selectedCursus = function;
	  	this.userForm = function;
	  	this.refreshFuncties();
	  	//console.log('onSelect(this.selectedFunction)');
	  	//console.log(this.selectedFunction);
	}

	addFunction() {
	  	this.loading = true;
	  	console.log(this.userForm);
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
	      	this.functieService.addFunctie(this.userForm.email,token).subscribe(user => {
        		this.mode = 'view';
	        	this.functieService.getFuncties(token).subscribe(functions => {
	          		this.functions = functions;
	
	          		// this.onSelect(this.functions[this.functions.length-1]);
	            	this.loading = false;
	            	this.cursusModal.hide();
	          });
	    	});
	  	});
	}
	
	saveDunction(form: any) {
	  	this.loading = true;
	  	// const formValues = form.value;
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
	    	//console.log(token);
	    	console.log(form.value);
	    	
	    	this.functieService.updateFunctie(this.selectedFunction.id, form.value, token).subscribe(data => {
	      		this.mode = 'view';
	      		this.loadFunctions();
	      		
	      		this.functieService.getRolesByObject(this.selectedFunction.id, token).subscribe(function => {
	        		console.log(function);
	        		this.onSelect(function);
	        		this.loading = false;
	        		this.cursusModal.hide();
	      		});
	    	});
	  	});
	}

	loadFunctions(){
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
	    	//console.log(token);
	
		    this.functieService.getFuncties(token).subscribe(functions => {
		      	console.log(functions);
		      	this.courses= functions;
		      	this.selectedFunction = this.functions[0];
		      	this.userForm = this.functions[0];
		      	//this.refreshModules();
		    });
	  	});
	}

	refreshFuncties() {
	  	this.loading = true;
	
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
		    this.functieService.getFunctiesByObject(this.selectedFunction.modules, token).subscribe(modules => {
		      	this.selectedFunction.moduleArr = modules;
		      	//console.log('selectedFunction.moduleArr');
		      	//console.log(this.selectedFunction.moduleArr);
		      	this.loading = false;
		    });
	  	});
	}


	deleteFunctie(md: Object) {
  		this.authService.maakTokenHeadervoorCurcon().then( token => {
    		this.functieService.deleteFunctie(this.selectedFunction.id, token).subscribe(
      			result => {this.refreshFuncties(); },
      			error => {this.refreshFuncties(); }
    		);
  		});
	}
}
