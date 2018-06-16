import { Component, OnInit } from '@angular/core';
import { DocentenService } from '../services/docenten.service';
import { Docent } from '../model/docent';
import {AuthService} from '../providers/auth.service';

@Component({
  selector: 'app-docenten',
  templateUrl: './docenten.component.html',
  styleUrls: ['./docenten.component.css']
})
export class DocentenComponent implements OnInit {
  //loading: boolean;
  docenten: Array<Docent>;
  constructor(private docentenService: DocentenService, private authService:AuthService) {
    //this.loading = true;
  }

  ngOnInit() {
  }

  refreshDocenten() {
    //this.loading = true;
    this.docentenService.getDocenten(this.authService.maakTokenHeadervoorCurcon() ).subscribe(docenten => {
      this.docenten = docenten;
      //this.loading = false;
    });
  }
}
