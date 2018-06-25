import { Component, OnInit } from '@angular/core'; // Input niet nodig
import { Rol } from '../model/rol';
import { RolService } from '../services/rol.service';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-rollen',
  templateUrl: './rollen.component.html',
  styleUrls: [ './rollen.component.css' ]
})
export class RollenComponent implements OnInit {

  rollen: Rol[];
  private searchTerms = new Subject<string>();

  constructor(private rolService : RolService, private authService: AuthService) {
    //this.loading = true; // is dit nodig?
    this.getRollen();

  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getRollen(): void {
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      //console.log(token);

      this.rolService.getRollen(token).subscribe(rollen => this.rollen = rollen);
    });
  }
  ngOnInit(): void {
    console.log(this.getRollen())
  }
}
