import { Component, OnInit } from '@angular/core';
import { Rol } from '../model/rol';

@Component({
  selector: 'app-rollen',
  templateUrl: './rollen.component.html',
  styleUrls: ['./rollen.component.css']
})
export class RollenComponent implements OnInit {

  rol: Rol = {
    id: 1,
    name: "docent",
    modules: {
        href: "GET URI"
      }
  }

  constructor() { }

  ngOnInit() {
  }

}
