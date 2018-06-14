import { Component, OnInit } from '@angular/core';
import { DocentenService } from '../services/docenten.service';
import { Docent } from '../model/docent';

@Component({
  selector: 'app-docenten',
  templateUrl: './docenten.component.html',
  styleUrls: ['./docenten.component.css']
})
export class DocentenComponent implements OnInit {
  //loading: boolean;
  docenten: Array<Docent>;
  constructor(private docentenService: DocentenService) {
    //this.loading = true;
  }

  ngOnInit() {
  }

  refreshDocenten() {
    //this.loading = true;
    this.docentenService.getDocenten().subscribe(docenten => {
      this.docenten = docenten;
      //this.loading = false;
    });
  }
}
