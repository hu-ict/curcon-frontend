import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from '../providers/auth.service';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

naam:string;
email:string;
rol:string;
telefoon:string;
creationTime:string;
lastLogin:string;
photo:string;

  constructor(private afAuth: AngularFireAuth,private authService:AuthService,private userService:UserService) {
    //Loading=true
    this.afAuth.authState.subscribe((auth) => {
      console.log("authstate updated//user changed");
      this.loadProfile();
    })
   }

  ngOnInit() {
  }

  loadProfile(){
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //TODO rol ophalen
      this.userService.getRoleByUser(this.afAuth.auth.currentUser.email, token ).subscribe(rol => {
        this.rol=rol.name;

      });
    })
    this.photo=this.afAuth.auth.currentUser.photoURL;
    this.naam=this.afAuth.auth.currentUser.displayName;
    this.email=this.afAuth.auth.currentUser.email;
    this.telefoon=this.afAuth.auth.currentUser.phoneNumber;
    this.creationTime=this.afAuth.auth.currentUser.metadata.creationTime;
    this.lastLogin=this.afAuth.auth.currentUser.metadata.lastSignInTime;



  }

}
