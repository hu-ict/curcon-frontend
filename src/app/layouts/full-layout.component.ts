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
    console.log("WARNING update state"+auth.email);
    if (this.afAuth.auth.currentUser== null){
      //Gebruiker is niet ingelogd
      this.router.navigate(['logins']);
    }
    else{
      this.userService.getUser(this.afAuth.auth.currentUser.email).subscribe(user=>{
        console.log(user);
        if (user==null){
          //Gebruiker logt voor de eerse keer in
              console.log("Eerste keer dat je Inlogt met dit account");
              this.initialized=true;
              this.userService.addUser(this.afAuth.auth.currentUser.email).subscribe(user =>{
              this.initializefurther();
              });
        }
        else{
            this.initializefurther();
        }
      });

    }

  })
  this.selectedOrganisatie = JSON.parse(localStorage.getItem('selectedOrganisatie')).naam;
}

logout(){
  this.authService.signOut();
  console.log("uitgelogd");
}


initializefurther(){

  this.authService.maakTokenHeadervoorCurcon().then( token => {
    this.organisatieService.getOrganisaties(token).subscribe(organisaties => {
      this.allOrganisaties=organisaties;
      if(localStorage.getItem('selectedOrganisatie') == null)
        localStorage.setItem('selectedOrganisatie', JSON.stringify(this.allOrganisaties[0]));
      console.log(this.allOrganisaties);
    });

    this.userService.getRoleByUser(this.afAuth.auth.currentUser.email,token).subscribe(rol => {
    console.log(rol);
    console.log("Dit is je rolname"+rol.name);

    //hardcoded admin?
    if(rol.name =="admin" ||rol.name == "developer")
          this.beheerToegang=true;
    });

     //TODO Verwijder dit als beheer niet altijd visible moet zijn.
      // this.beheerToegang=true;



    });
    this.username=this.afAuth.auth.currentUser.displayName;


  }

}
