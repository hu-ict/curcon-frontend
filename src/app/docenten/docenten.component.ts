import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { DocentenService } from '../services/docenten.service';
import { Docent } from '../model/docent';
import {AuthService} from '../providers/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-docenten',
  templateUrl: './docenten.component.html',
  styleUrls: ['./docenten.component.css']
})
export class DocentenComponent implements OnInit {
  @ViewChild('docentModal') docentModal: any;
  @Input() docenten: Array<any>;
  loading: boolean;
  currentState: number;
  mode: string;
  docentForm = <any>{};
  docentId: number;

  constructor(private docentenService: DocentenService, private authService:AuthService,private afAuth: AngularFireAuth) {
    this.loading = true;

    this.afAuth.authState.subscribe((auth) => {
      console.log("authstate updated//user changed");
      this.refreshDocenten();
    })
  }

  ngOnInit(): void {

  }

  initializeDocentForm() {
    this.docentForm = {};
    this.docentId=null;

  }

  saveDocent() {
      this.loading = false; //FIXME Is dit niet True??
        this.authService.maakTokenHeadervoorCurcon().then( token => {
        console.log(token);
          this.docentenService.saveDocent(this.docentId, this.docentForm,token).subscribe(docent => {
          this.refreshDocenten();
          this.docentModal.hide();
          this.loading = false;
        })
      });
    }

  getDocent(docent) {
    this.docentId = docent.id;
    this.docentForm.naam = docent.naam;
  }
  refreshDocenten() {
    this.loading = true;
    let self = this;
    this.authService.maakTokenHeadervoorCurcon().then( token => {
       self.docenten= [];
      this.docentenService.getDocenten( token ).subscribe(docenten => {
        this.docenten=docenten;
        //console.log(docent.naam);
        this.loading = false;
      });
    })
  }

  isEmptyObject(obj) {
    return (Object.keys(obj).length === 0);
  }
}
