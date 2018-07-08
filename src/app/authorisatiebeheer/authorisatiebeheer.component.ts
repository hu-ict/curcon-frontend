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

  constructor() { }

  ngOnInit(): void { }
}
