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
  templateUrl: './b-user.component.html',
  // styleUrls: ['./b-user.component.css']
})
export class BUserComponent implements OnInit {
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
  @Input() users: Array<any>;
  @Output() onSelectedUser = new EventEmitter<Object>();
  //Allroles
  selectedCursus = <any>{};

  constructor(public authService: AuthService, private userService : UserService, private rolService : RolService, private moduleService : ModuleService, private functieService : FunctieService, private afAuth: AngularFireAuth) {
    //this.loading = true;
    this.afAuth.authState.subscribe((auth) => {
    this.loadButtons();
    this.refreshRollen();
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
  this.refreshRollen();
}
changeMode(mode) {
  this.mode = mode;
  this.refreshRollen();
}
closeModal(modal) {
  this.loading = false;
  modal.hide();
}
onSelect(user: Object) {
  this.onSelectedCourse.emit(user);
  this.selectedCursus = user;
  this.userForm = user;
  // this.refreshModules();
  console.log('onSelect(this.onSelectedUser)');
  console.log(this.onSelectedUser);
}

addUser() {
  this.loading = true;
  console.log(this.userForm);
  this.authService.maakTokenHeadervoorCurcon().then( token => {
      this.userService.addUser(this.userForm.email).subscribe(user => {
        this.mode = 'view';
        this.userService.getUsers(token).subscribe(users => {
          this.courses=users;
          // this.onSelect(this.users[this.users.length-1]);
            this.loading = false;
            this.cursusModal.hide();
          });
    });
  });
}
saveUser(form: any) {
  this.loading = true;
  // const formValues = form.value;
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    //console.log(token);
    console.log(form.value.rol);
    this.userService.updateRoleByUser(this.onSelectedUser.username, form.value, token).subscribe(data => {
      this.mode = 'view';
      this.loadUsers();
      this.userService.getUsersByObject(this.onSelectedUser,token).subscribe(user => {
        console.log(user);
        this.onSelect(user);
        this.loading = false;
        this.cursusModal.hide();
      });
    });
  });
}

loadUsers(){
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    //console.log(token);

    this.userService.getUsers(token).subscribe(users => {
      console.log(users);
      this.courses= users;
      this.onSelectedUser = this.users[0];
        this.userForm = this.users[0];

    });
  });
}

refreshRollen() {
  this.loading = true;
  let self = this;
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.rolService.getRoles(token).subscribe(rollen => {
      this.allRoles=rollen;
      this.loading = false;
    }
  );
});
}

deleteUser(md: Object) {
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.userService.deleteUser(this.onSelectedUser.id, token).subscribe(
      result => {this.refreshUsers(); },
      error => {this.refreshUsers(); }
    );
  });
}

refreshUsers() {
	this.loading = true;

    this.authService.maakTokenHeadervoorCurcon().then( token => {
     	//console.log(token);

     this.userService.Users(this.onSelectedUser, token).subscribe(users => {
       this.selectedCursus.users = users;
       console.log('onSelectedUser.users');
       console.log(this.onSelectedUser.users);
       this.loading = false;
     });
   });
 }
}
