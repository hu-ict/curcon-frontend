import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Config } from "../model/config";

import { FirebaseUser } from "../model/firebaseuser"
import { AngularFireAuth } from 'angularfire2/auth';

import { ErrorService } from "./error.service";
import { catchError, map, tap} from 'rxjs/operators';

// adapted from: https://gist.github.com/codediodeio/5e02b605f2ab015f2fb1e60497bd46bf
@Injectable()
export class LoginService {

  authState: any = null;
  accesstoken : string;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    // private router:Router
  ) {
    this.afAuth.authState.subscribe((auth) => {
    this.authState = auth
  })
  }
    // sendToFirebase() : void {
    //   return this.http.post<FirebaseUser>(this.http.post())
    // }
    firebase: string;
    makeToken(){
      let httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": 'application/json',
          "Authorization" : this.accesstoken
        })
      }
    }

    // TODO:
}
