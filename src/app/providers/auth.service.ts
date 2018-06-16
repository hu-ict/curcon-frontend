import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Config } from "../model/config";
import { Router } from '@angular/router';

import { FirebaseUser } from "../model/firebaseuser"
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { ErrorService } from '../services/error.service';
import { catchError, map, tap} from 'rxjs/operators';


// TODO: klaar om te testen met login component
// adapted from: https://gist.github.com/codediodeio/5e02b605f2ab015f2fb1e60497bd46bf
@Injectable()
export class AuthService {

  //authState: any;
  accesstoken : string;
  //firebase: string;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private router:Router,
  ) {
    this.afAuth.authState.subscribe((auth) => {
      console.log("authstate updated//user changed");
    //  this.authState = auth;
  })
  }
  // sendToFirebase() : void {
  //   return this.http.post<FirebaseUser>(this.http.post())
  // }
  maakTokenHeadervoorCurcon(){
//  var headers=null;
console.log(this.afAuth.auth.currentUser+"huidige user");
var headersPromise=  this.afAuth.auth.currentUser.getIdToken().then(function(token){
    //console.log(value); ==Token
    let headers =
   new HttpHeaders({
        "Content-Type": 'application/json',
        "Authorization" : token, //Answer of 1st promise is token
    }  )
return headers;//Answer of 2nd promise
  });
  //Deze functie returnt bovenstaande promise
  //Check met .then(function(output) voor de Headers
 return headersPromise;

  }
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }
  // 2.redirect naar google login
  // 3. gebruiker logt aan en krijgt een token
  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
      // .then((credential) =>  {
      //     this.authState = credential.user
      // })
      // .catch(error => console.log(error));
  }

  // test(){
  //   var test = this.afAuth.idToken
  // }

  //// Sign Out ////
  signOut(): void {
    this.afAuth.auth.signOut();
    // this.router.navigate(['/'])
  }
}
