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
  loading: boolean;
  docenten: Array<Docent>;
  constructor(private docentenService: DocentenService, private authService:AuthService) {
    this.loading = true;
  }

  ngOnInit() {
  }

  refreshDocenten() {
    let self = this;
    this.authService.maakTokenHeadervoorCurcon().then( token => {
      this.loading = true;
      this.docentenService.getDocenten( token ).subscribe(docent => {
        this.docenten.push(docent);
        this.loading = false;
      });
    })
  }
}
