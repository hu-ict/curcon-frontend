import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(public authService : AuthService, private router: Router) { }

  login(){
    this.authService.googleLogin().then((data) => {
      this.router.navigate(['']);
    });
    //return 'Hello world';
  }

  ngOnInit() {
  }

}
