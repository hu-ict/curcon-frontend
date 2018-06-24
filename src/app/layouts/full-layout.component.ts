import { Component, OnInit } from '@angular/core';
import {OrganisatiesService} from '../services/curcon/organisaties.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from '../providers/auth.service';

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
      if (this.afAuth.auth.currentUser.displayName== null){
        console.log("niet ingelogd noob");
      }
      document.getElementById("user").innerHTML=this.afAuth.auth.currentUser.displayName;
    }
  )
}

onChange(item) {
  this.organisatieService.getOrganisatieById(item).subscribe(organisatie => {
    localStorage.setItem('selectedOrganisatie', JSON.stringify(organisatie));
    this.selectedOrganisatie = organisatie.naam;
  });
}

constructor(private organisatieService: OrganisatiesService,private afAuth: AngularFireAuth,private authService:AuthService,) {
  this.allOrganisaties = [];
  organisatieService.getOrganisaties().subscribe(organisatie => {
    this.allOrganisaties.push(organisatie);
    if(localStorage.getItem('selectedOrganisatie') == null)
    localStorage.setItem('selectedOrganisatie', JSON.stringify(this.allOrganisaties[0]));
    console.log(this.allOrganisaties);
  });

  this.selectedOrganisatie = JSON.parse(localStorage.getItem('selectedOrganisatie')).naam;
}

logout(){
  this.authService.signOut();
  console.log("uitgelogd");
}
}
