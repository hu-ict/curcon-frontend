import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';

@Component({
	selector: 'boks-overzicht',
	templateUrl: 'boks-overzicht.component.html',
})
export class BoksOverzichtComponent {
	private _boks: Array<any>;
	 
	@Input()
	set boks(boks: Array<any>) {
		// console.log("SET this._boks");
		this._boks = boks;
		// console.log(this._boks);
	}

	get boks(): Array<any> {return this._boks;}
	
}
