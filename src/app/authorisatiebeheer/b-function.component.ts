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
	@ViewChild('functionModal') functionModal: any;
	loading: boolean;
	naam: string;
	error: boolean;
	mode: string;

	functieform = <any>{};
	@Input() functions: Array<any>;
	@Output() onSelectedFunction = new EventEmitter<Object>();
	selectedFunction = <any>{};

	//FIXME deze boolean zijn nog niet aan html gekoppeld+check
	isVisibleFunction_get : boolean;
	isVisibleFunction_post : boolean;
	isVisibleFunction_delete : boolean;




		constructor(public authService: AuthService, private userService : UserService, private rolService : RolService, private moduleService : ModuleService, private functieService : FunctieService, private afAuth: AngularFireAuth) {
			//this.loading = true;
			this.afAuth.authState.subscribe((auth) => {
			this.loadButtons();
			this.loadFunctions();
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

	initializeFunctionform(){
  		this.functieform = {};
  		// this.refreshRollen();
	}
	changeMode(mode) {
  		this.mode = mode;
	}

	closeModal(modal) {
	  	this.loading = false;
	  	modal.hide();
	}

	onSelect(functie: Object) {
	  	this.onSelectedFunction.emit(functie);
	  	this.selectedFunction = functie;
	  	this.functieform = functie;
	  	//console.log('onSelect(this.selectedFunction)');
	  	//console.log(this.selectedFunction);
	}

	addFunction() {
	  	this.loading = true;
	  	console.log(this.functieform);
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
	      	this.functieService.addFunctie(this.functieform.name,token).subscribe(x => {
        		this.mode = 'view';
	        	this.functieService.getFuncties(token).subscribe(functions => {
	          		this.functions = functions;

	          		// this.onSelect(this.functions[this.functions.length-1]);
	            	this.loading = false;
	            	this.functionModal.hide();
	          });
	    	});
	  	});
	}

	saveFunction(form: any) {
	  	this.loading = true;
	  	// const formValues = form.value;
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
	    	//console.log(token);
	    	console.log(form.value);

	    	this.functieService.updateFunctie(this.selectedFunction.id, form.value, token).subscribe(data => {
	      		this.mode = 'view';
	      		this.loadFunctions();

						//FIXME
	      		// this.functieService.getRolesByObject(this.selectedFunction.id, token).subscribe(functie => {
	        	// 	console.log(functie);
	        	// 	this.onSelect(functie);
	        	// 	this.loading = false;
	        	// 	this.functionModal.hide();
	      		// });
	    	});
	  	});
	}

	loadFunctions(){
			this.loading = true;
	  	this.authService.maakTokenHeadervoorCurcon().then( token => {
	    	//console.log(token);

		    this.functieService.getFuncties(token).subscribe(functions => {
		      	console.log(functions);
		      	this.functions= functions;
		      	this.selectedFunction = this.functions[0];
		      	this.functieform = this.functions[0];
		      	this.loading = false;
		    });
	  	});
	}

	deleteFunction() {
  		this.authService.maakTokenHeadervoorCurcon().then( token => {
    		this.functieService.deleteFunctie(this.selectedFunction.id, token).subscribe(
      			result => {this.loadFunctions(); },
      			error => {this.loadFunctions(); }
    		);
  		});
	}
}
