import { Component, OnInit } from '@angular/core';
import {OrganisatiesService} from '../services/curcon/organisaties.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from '../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [OrganisatiesService],
})
export class FullLayoutComponent implements OnInit {

  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};
  public allOrganisaties: Array<any>;
  public selectedOrganisatie: Object;

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((auth) => {
      if (this.afAuth.auth.currentUser== null){
        console.log("niet ingelogd noob");
        //TODO stuur de gebruiker door naar de inlogpagina
        //..
        this.router.navigate(['logins']);
      }
      document.getElementById("user").innerHTML=this.afAuth.auth.currentUser.displayName;
    }
  )
}

onChange(item) {
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.organisatieService.getOrganisatieById(item,token).subscribe(organisatie => {
      localStorage.setItem('selectedOrganisatie', JSON.stringify(organisatie));
      this.selectedOrganisatie = organisatie.naam;

    });
  })
}

constructor(private organisatieService: OrganisatiesService,private afAuth: AngularFireAuth,private authService:AuthService, private router: Router) {
  this.allOrganisaties = [];
  this.afAuth.authState.subscribe((auth) => {
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      organisatieService.getOrganisaties(token).subscribe(organisatie => {
        this.allOrganisaties.push(organisatie);
        if(localStorage.getItem('selectedOrganisatie') == null)
        localStorage.setItem('selectedOrganisatie', JSON.stringify(this.allOrganisaties[0]));
        console.log(this.allOrganisaties);
      });
    })
  })
  this.selectedOrganisatie = JSON.parse(localStorage.getItem('selectedOrganisatie')).naam;
}

logout(){
  this.authService.signOut();
  console.log("uitgelogd");
}
}
