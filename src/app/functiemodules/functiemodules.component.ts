import { Component, OnInit } from '@angular/core';
import { FunctieModule } from '../model/functiemodule';

@Component({
  selector: 'app-functiemodules',
  templateUrl: './functiemodules.component.html',
  styleUrls: ['./functiemodules.component.css']
})
export class FunctiemodulesComponent implements OnInit {

  functiemodule: FunctieModule = {
    id: 1,
    name: "string",
    href: "GET URI"
  }

  constructor() { }

  ngOnInit() {
  }

}
