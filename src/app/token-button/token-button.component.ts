import { Component, OnInit } from '@angular/core';
import {AuthService} from '../providers/auth.service';
import {DocentenService} from '../services/docenten.service';
import {FunctieService} from '../services/functie.service';
import {UserService} from '../services/user.service';
import { Docent } from '../model/docent';
// import {TokenButtonComponent} from '../token-button/token-button.component';

@Component({
  selector: 'app-token-button',
  templateUrl: './token-button.component.html',
  styleUrls: ['./token-button.component.css']
})
export class TokenButtonComponent implements OnInit {
  docenten: Docent[]= new Array<Docent>();
  constructor(public authService : AuthService,public docentenService:DocentenService,public functieService:FunctieService
    ) {
    }
    
    tokenButtonPrint(){

      let self = this;
      this.authService.maakTokenHeadervoorCurcon().then(function(headers){
        self.docenten= [];
        console.log("Outputtokenbutton"+headers);
        //const observer = {next: x => console.log('Observer got a next value: ' + x) };
        //Na het ophalen van de headers via  promise geef ze door
        self.docentenService.getDocenten(headers).subscribe(docent => {
          console.log('Observer got a next value: ' + docent)
          //TODO Nu alleen nog deze value in de lijst krijgen
          if (docent !=null){
              self.docenten.push(docent)
        }


          //this.loading = false;
        }

      )

        //console.log(self.docenten.naam+"dit is nu in het lijstje");
    });



  }

  ngOnInit() {
  }

}
