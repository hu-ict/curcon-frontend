import { Component, OnInit } from '@angular/core'; // Input niet nodig
import { Rol } from '../model/rol';
import { RolService } from '../services/rol.service';
import { Observable, Subject } from "rxjs";

@Component({
  selector: 'app-rollen',
  templateUrl: './rollen.component.html',
  styleUrls: [ './rollen.component.css' ]
})
export class RollenComponent implements OnInit {

  rollen: Rol[];
  private searchTerms = new Subject<string>();

  constructor(private rolService : RolService) {
    //this.loading = true; // is dit nodig?
    this.getRollen();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getRollen(): void {
    this.rolService.getRollen()
    .subscribe(rollen => this.rollen = rollen);
  }
  ngOnInit(): void {
    console.log(this.getRollen())
  }
}
