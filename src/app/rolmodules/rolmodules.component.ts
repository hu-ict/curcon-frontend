import { Component, OnInit } from '@angular/core';
import { RolModule } from '../model/rolmodule';

@Component({
  selector: 'app-rolmodules',
  templateUrl: './rolmodules.component.html',
  styleUrls: ['./rolmodules.component.css']
})
export class RolmodulesComponent implements OnInit {

  rolmodule: RolModule = {
    id: 1,
    name: "wat is een docent 'module'?",
    functies: {
        href: "GET URI"
      }
  }

  constructor() { }

  ngOnInit() {
  }

}
