import { Component, OnInit } from '@angular/core'; // Input niet nodig
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Observable, Subject } from "rxjs";
import {AuthService} from '../providers/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.css' ]
})
export class UsersComponent implements OnInit {

  users: User[];
  private searchTerms = new Subject<string>();

  constructor(private userService : UserService, private authService : AuthService) {
    //this.loading = true; // is dit nodig?

    //TODO Idtoken kan niet gelezen worden van null
    //this.getUsers(authService.maakTokenHeadervoorCurcon());
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getUsers(headersIn): void {
    this.userService.getUsers(headersIn)
    .subscribe(users => this.users = users);
  }
  ngOnInit(): void {

  }
}
