import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {AuthService} from '../providers/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {FunctieService } from '../services/functie.service';
import {UserService} from '../services/user.service';
import {RolService} from '../services/rol.service';
import {ModuleService} from '../services/module.service';

@Component({
  selector: 'app-authorisatiebeheer',
  templateUrl: './authorisatiebeheer.component.html',
  styleUrls: ['./authorisatiebeheer.component.css']
})
export class AuthorisatiebeheerComponent implements OnInit {
	@ViewChild('AuthorisatiebeheerModal') authorisatiebeheerModal: any;
  	allRoles: Array<any>;
  	rolesByUser: Array<any>;
  	functies: Array<any>;
  	loading: boolean;
  	naam: string;
  	error: boolean;
	mode: string;

  userForm = <any>{};
  //FIXME deze boolean zijn nog niet aan html gekoppeld+check
	isVisibleUser_get : boolean;
	isVisibleUser_post : boolean;
	isVisibleUser_delete : boolean;

	isVisibleRole_get : boolean;
	isVisibleRole_post : boolean;
	isVisibleRole_delete : boolean;

  	constructor(public authService: AuthService, private userService : UserService, private rolService : RolService, private moduleService : ModuleService, private functieService : FunctieService, private afAuth: AngularFireAuth) {
  		//this.loading = true;
    	this.afAuth.authState.subscribe((auth) => {
      		this.loadButtons();
    	})
  	}

  	ngOnInit() { }

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
}
  	addUser() {
  		this.loading = true;
    	// const formValues = form.value;
      console.log(this.userForm);
      //console.log(formValues);
    	this.authService.maakTokenHeadervoorCurcon().then( token => {
    		this.mode = 'view'; //doet nog niks in de html
    		this.userService.addUser(this.userForm.email).subscribe(user => {
      			this.loading = false;
      			this.authorisatiebeheerModal.hide();
    		});
      	});
  	}

  	/*
  	getRoles() {
  		this.authService.maakTokenHeadervoorCurcon().then( token => {
  			this.rolService.getRoles(token).subscribe(result => {
	        	this.rol = result;
	        	//this.loading = false;
	     	});
	  	});
	}

	getRoleByUser() {
    	this.authService.maakTokenHeadervoorCurcon().then( token => {
  			this.userService.getRoleByUser(user, token).subscribe(result => {
	        	this.rol = result;
	        	//this.loading = false;
	     	});
	  	});
  	}

  	getFunctionsByUser() {
    	this.authService.maakTokenHeadervoorCurcon().then( token => {
  			this.userService.getFunctionsByUser(token).subscribe(result => {
	        	this.rol = result;
	        	//this.loading = false;
	     	});
	  	});
  	}
	*/
}
