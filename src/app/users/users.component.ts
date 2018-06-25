import { Component, OnInit } from '@angular/core'; // Input niet nodig
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Observable, Subject } from "rxjs";
import {AuthService} from '../providers/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.css' ]
})
export class UsersComponent implements OnInit  {
//  loading: boolean;
  users: User[];
  private searchTerms = new Subject<string>();

  constructor(private userService : UserService, private authService : AuthService,  private afAuth: AngularFireAuth,) {
    //this.loading = true; // is dit nodig?
    this.afAuth.authState.subscribe((auth) => {
      console.log("authstate updated//user changed");
      this.getUsers();
    //  this.authState = auth;
  });

  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getUsers(): void {
    let self = this;
    
    self.authService.maakTokenHeadervoorCurcon().then(function(headers){
      self.userService.getUsers(headers)
      .subscribe(users => self.users = users)
    })
  }

  ngOnInit(): void {
  }
}
