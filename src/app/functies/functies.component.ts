import { Component, OnInit } from '@angular/core'; // Input niet nodig
import { Functie } from '../model/functie';
import { FunctieService } from '../services/functie.service';
import { Observable, Subject } from "rxjs";

@Component({
  selector: 'app-functies',
  templateUrl: './functies.component.html',
  styleUrls: [ './functies.component.css' ]
})
export class FunctiesComponent implements OnInit {

  functies: Functie[];
  private searchTerms = new Subject<string>();

  constructor(private functieService : FunctieService) {
    //this.loading = true; // is dit nodig?
    this.getFuncties();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getFuncties(): void {
    //TODO token meegeven
    // this.functieService.getFuncties()
    // .subscribe(functies => this.functies = functies);
  }
  ngOnInit(): void {

  }
}

// [1] Observe: https://angular.io/guide/http#getting-json-data
