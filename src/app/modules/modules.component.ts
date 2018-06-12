import { Component, OnInit } from '@angular/core';
import { Module } from '../model/module';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {

  module: Module = {
    id: 1,
    name: "wat is een module?",
    href: "GET URI"
  }
  constructor() { }

  ngOnInit() {
  }
}
