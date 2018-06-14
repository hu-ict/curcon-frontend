import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent implements OnInit {

  constructor(public authService : AuthService, private router: Router) { }


  login(){
    this.authService.googleLogin().then((data) => {
      this.router.navigate(['logins']);
    });
    //return 'Hello world';
  }

  ngOnInit() {
  }

}
