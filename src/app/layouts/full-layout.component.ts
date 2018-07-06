import { Component, OnInit } from '@angular/core';
import {OrganisatiesService} from '../services/curcon/organisaties.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from '../providers/auth.service';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';

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
  beheerToegang:boolean;
  username :string;
  initialized:boolean;
  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
}

onChange(item) {
  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.organisatieService.getOrganisatieById(item,token).subscribe(organisatie => {
      localStorage.setItem('selectedOrganisatie', JSON.stringify(organisatie));
      this.selectedOrganisatie = organisatie.naam;

    });
  })
}

constructor(private organisatieService: OrganisatiesService,private userService:UserService,private afAuth: AngularFireAuth,private authService:AuthService,
  private router: Router) {
  this.allOrganisaties = [];
  this.afAuth.authState.subscribe((auth) => {
    if (this.afAuth.auth.currentUser== null){
      //Gebruiker is niet ingelogd
      this.router.navigate(['logins']);
    }
    else{
      this.initialize();
    }

  })
  this.selectedOrganisatie = JSON.parse(localStorage.getItem('selectedOrganisatie')).naam;
}

logout(){
  this.authService.signOut();
  console.log("uitgelogd");
}

initialize(){
  if(!this.initialized && this.afAuth.auth.currentUser.metadata.creationTime==this.afAuth.auth.currentUser.metadata.lastSignInTime){
    //Gebruiker logt voor de eerse keer in
        console.log("Eerste keer dat je Inlogt met dit account");
        this.initialized=true;
        this.userService.addUser(this.afAuth.auth.currentUser.email).subscribe(user =>{
      //    this.initialize();
        });
      }

  else{
    //Gebruiker bestaat al
    //    this.initialize();
  }



  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.organisatieService.getOrganisaties(token).subscribe(organisatie => {
      this.allOrganisaties.push(organisatie);
      if(localStorage.getItem('selectedOrganisatie') == null)
        localStorage.setItem('selectedOrganisatie', JSON.stringify(this.allOrganisaties[0]));
      console.log(this.allOrganisaties);
    });

    //TODO check voor rol=admin
    this.beheerToegang=true;
    // this.userService.getUsers(token).subscribe(users => {
    //   console.log(users);
    //   console.log(users[0]);
    //   this.functieService.getFunctiesByObject(users[0].role,token).subscribe(role => {
    //     console.log(role);
    //   })
    // })


  });
  this.username=this.afAuth.auth.currentUser.displayName;


}
}
