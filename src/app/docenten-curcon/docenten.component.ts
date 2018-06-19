//import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';
import {Component, Input, OnInit, ViewChild, Directive} from '@angular/core';
import { Docent } from '../model/docent';
import {AuthService} from '../providers/auth.service';
import { Router } from '@angular/router';		//TODO
import { DocentenService } from '../services/docenten.service';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';//TODO
import { OrderByPipe } from './orderby.pipe';//TODO
//import {DocentComponent} from "../test/docent.component"

@Component({
	templateUrl: 'docenten.component.html',
	//pipes: [OrderByPipe]
})

export class DocentenComponent implements OnInit {
    @ViewChild('docentModal') docentModal: any;
    @Input() docenten: Array<any>;
    loading: boolean;
    currentState: number;
    mode: string;
    docentForm = <any>{};
    docentId: number;

		constructor(private docentenService: DocentenService, private authService:AuthService) {
			this.loading = true;
		}

    ngOnInit(): void {
			let self = this;
			this.authService.maakTokenHeadervoorCurcon().then( token => {
				this.loading = true;
				this.docentenService.getDocenten( token ).subscribe(docent => {
					this.docenten.push(docent);
				},
				error => console.log('Error: ', error),
				() => {
					this.loading = false;
				});
			})
    }

    initializeDocentForm() {
        this.docentForm = {};
    }

    // saveDocent() {
    //     this.loading = false;
    //     this.docentenService.saveDocent(this.docentId, this.docentForm).subscribe(docent => {
    //       this.refreshDocenten();
    //       this.docentModal.hide();
    //       this.loading = false;
    //     });
    //   }

    getDocent(docent) {
      this.docentId = docent.id;
      this.docentForm.naam = docent.naam;
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

    isEmptyObject(obj) {
      return (Object.keys(obj).length === 0);
    }
}
