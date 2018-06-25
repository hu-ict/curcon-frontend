import { Component, OnInit } from '@angular/core'; // Input niet nodig
import { Module } from '../model/module';
import { ModuleService } from '../services/module.service';
import { Observable, Subject } from "rxjs";
import {AuthService} from '../providers/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {FunctieService } from '../services/functie.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: [ './modules.component.css' ]
})
export class ModulesComponent implements OnInit {

  modules: Module[];
  private searchTerms = new Subject<string>();

  constructor(private moduleService : ModuleService, private authService: AuthService) {
    //this.loading = true; // is dit nodig?
    this.getModules();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getModule(){}

  getModules(): void {
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //console.log(token);

      this.moduleService.getModules(token).subscribe(modules => this.modules = modules);
    });
  }
  ngOnInit(): void {

  }
}

// [1] Observe: https://angular.io/guide/http#getting-json-data
