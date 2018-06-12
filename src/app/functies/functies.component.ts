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
  //@Input() functies: Array<Functie>; is ouwe meuk
  //error: String; // is dit nodig?
  //loading: boolean; //

  functies: Functie[];
  private searchTerms = new Subject<string>();

  constructor(private functieService : FunctieService) {
    //this.loading = true; // is dit nodig?
    this.getFuncties();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  // functie: Functie = {
  //   id: 1,
  //   name: "voeg leerdoelen toe",
  //   href: "GET URI"
  // }

  // TODO: hoe werkt routing?
  // getFunctie(): void {
  //   const id = +this.r
  // }

  getFuncties(): void {
    this.functieService.getFuncties()
    .subscribe(functies => this.functies = functies);
  }

  // gebruik oninit voor functie-details en functie-search
  // toon de volledige response: [1]
  ngOnInit(): void {

  }

    //// ouwe meuk hieronder
    // this.functieService.getFuncties().subscribe(
    //   functies => this.functies,
    //   error => console.log(error),
    //
    // );
  //}
}

// [1] Observe: https://angular.io/guide/http#getting-json-data
