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
  @ViewChild('userModal') cursusModal: any;
  loading: boolean;
  naam: string;
  error: boolean;
  mode: string;

  userForm = <any>{};
  @Input() users: Array<any>;
  @Output() onSelectedUser = new EventEmitter<Object>();
  selectedUser = <any>{};

  allRoles: Array<any>;

  isVisibleUser_post : boolean;
  isVisibleUser_delete : boolean;

  //wijzigt alleen de role;
  isVisibleUser_put:boolean;

  constructor(public authService: AuthService, private userService : UserService, private rolService : RolService, private moduleService : ModuleService, private functieService : FunctieService, private afAuth: AngularFireAuth) {
    //this.loading = true;
    this.afAuth.authState.subscribe((auth) => {
    this.loadButtons();
    this.refreshRollen();
    this.loadUsers();
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
        if (functies.some(f=> f.name == "user_post")) {
          this.isVisibleUser_post=true;
        }
        if (functies.some(f=> f.name == "user_delete")) {
          this.isVisibleUser_delete = true;
        }
        if (functies.some(f=> f.name == "user_put")) {
          this.isVisibleUser_put=true;
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
  this.onSelectedUser.emit(user);
  this.selectedUser = user;
  this.userForm = user;
  // this.refreshModules();
  console.log('onSelect(this.selectedUser)');
  console.log(this.selectedUser);
}

addUser() {
  this.loading = true;
  console.log(this.userForm);
  this.authService.maakTokenHeadervoorCurcon().then( token => {
      this.userService.addUser(this.userForm.email).subscribe(user => {
        this.mode = 'view';
        this.userService.getUsers(token).subscribe(users => {
          this.users=users;
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
    this.userService.updateRoleByUser(this.selectedUser.username, form.value, token).subscribe(data => {
      this.mode = 'view';
      this.refreshusers();
    });
  });
}

loadUsers(){
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    //console.log(token);

    this.userService.getUsers(token).subscribe(users => {
      console.log(users);
      this.users= users;
      this.selectedUser = this.users[0];
        this.userForm = this.users[0];

    });
  });
}

refreshusers(){
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.userService.getUsers(token).subscribe(users => {
      console.log(users);
      this.users= users;
      let refreshUser=users.find(u=> u.username == this.selectedUser.username);

      this.onSelect(refreshUser);
      this.loading = false;
    });
  });
}

//wordt geladen bij het wijzigen van een user.
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

deleteUser() {
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.userService.deleteUser(this.selectedUser.username, token).subscribe(
      result => {this.loadUsers(); },
      error => {this.loadUsers(); }
    );
  });
}

}
