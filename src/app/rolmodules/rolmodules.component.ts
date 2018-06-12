import { Component, OnInit } from '@angular/core'; // Input niet nodig
import { Rol } from '../model/rol';
import { RolService } from '../services/rol.service';
import { Observable, Subject } from "rxjs";

@Component({
  selector: 'app-rolmodules',
  templateUrl: './rolmodules.component.html',
  styleUrls: [ './rolmodules.component.css' ]
})
export class RolmodulesComponent implements OnInit {

  rolmodules: Rol[];
  private searchTerms = new Subject<string>();

  constructor(private rolmoduleService : RolService) {
    //this.loading = true; // is dit nodig?
    this.getModulesByRol(1);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getModulesByRol(id): void {
    this.rolmoduleService.getModulesByRol(1)
    .subscribe(rolmodules => this.rolmodules = rolmodules);
  }
  ngOnInit(): void {

  }
}
