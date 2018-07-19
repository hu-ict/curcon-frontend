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
  selector: 'app-authorisatiebeheer',
  templateUrl: './authorisatiebeheer.component.html',
  styleUrls: ['./authorisatiebeheer.component.css']
})
export class AuthorisatiebeheerComponent implements OnInit {

  constructor(private userService:UserService,private afAuth: AngularFireAuth,private authService:AuthService,
    private router: Router) {

      this.afAuth.authState.subscribe((auth) => {
        // console.log("WARNING update state"+auth.email);
        this.userService.getUser(this.afAuth.auth.currentUser.email).subscribe(user=>{
          // console.log(user);
          this.authService.maakTokenHeadervoorCurcon().then( token => {
            this.userService.getRoleByUser(this.afAuth.auth.currentUser.email,token).subscribe(rol => {
              // console.log(rol);
              // console.log("Dit is je rolname"+rol.name);

              //hardcoded admin?
              if(rol.name !="admin" && rol.name != "developer")
                  this.router.navigate(['dashboard']);
              });

          });
        });


      }) }

      ngOnInit(): void { }
    }
