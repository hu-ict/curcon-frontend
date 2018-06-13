import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent implements OnInit {

  constructor() { }

  clickMessage = '';

  onClickMe(){
    this.clickMessage = 'Hello world';
  }
  ngOnInit() {
  }

}
