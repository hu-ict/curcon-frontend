import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

//import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2/auth';
//import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { FirebaseUser } from "../model/firebaseuser"
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }
}
