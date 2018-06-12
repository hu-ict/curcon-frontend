import { Component, OnInit } from '@angular/core'; // Input niet nodig
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Observable, Subject } from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.css' ]
})
export class UsersComponent implements OnInit {

  users: User[];
  private searchTerms = new Subject<string>();

  constructor(private userService : UserService) {
    //this.loading = true; // is dit nodig?
    this.getUsers();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }
  ngOnInit(): void {

  }
}
