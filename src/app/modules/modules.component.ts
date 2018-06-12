import { Component, OnInit } from '@angular/core'; // Input niet nodig
import { Module } from '../model/module';
import { ModuleService } from '../services/module.service';
import { Observable, Subject } from "rxjs";

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: [ './modules.component.css' ]
})
export class ModulesComponent implements OnInit {

  modules: Module[];
  private searchTerms = new Subject<string>();

  constructor(private moduleService : ModuleService) {
    //this.loading = true; // is dit nodig?
    this.getModules();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getModule(){}

  getModules(): void {
    this.moduleService.getModules()
    .subscribe(modules => this.modules = modules);
  }
  ngOnInit(): void {

  }
}

// [1] Observe: https://angular.io/guide/http#getting-json-data
