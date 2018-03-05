import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, Directive} from '@angular/core';

@Component({
   selector: 'bt-calculated',
   templateUrl: 'bt-calculated.component.html',
})
export class BtCalculatedComponent {
   private _profiel: Array<any>;
   matrix: Array<any>;

   @Input()
   set profiel(profiel: Array<any>) {
      console.log('SET this._profiel');
      this._profiel = profiel;
      console.log(this._profiel);
      this.matrix = this.generateMatrix('-');
      if (this._profiel != null) {
         for (let bt of this._profiel) {
            this.matrix[bt.beroepsTaak.architectuurlaagId][bt.beroepsTaak.activiteitId] = bt;
         }
      }
   }

   get profiel(): Array<any> {
      return this._profiel;
   }

	ngOnInit(): void {
	console.log('Start of bt_calculated.component');
		this.matrix = this.generateMatrix('x');
		if (this._profiel != null){ 
			for (let bt of this._profiel) {
				this.matrix[bt.beroepsTaak.architectuurlaagId][bt.beroepsTaak.activiteitId] = bt;
			}
		}
		console.log('this.matrix');
		console.log(this.matrix);
	}
	

	
	generateMatrix(teken : string) {
		let btMatrix = Array.apply(null, Array(6));
		for(let i = 0; i < btMatrix.length; i++) {
			btMatrix[i] = Array.apply(null, Array(6));
		}
		btMatrix[0][0] = teken;
		btMatrix[0][1] = 'B';
		btMatrix[0][2] = 'A';
		btMatrix[0][3] = 'A';
		btMatrix[0][4] = 'O';
		btMatrix[0][5] = 'R';
		btMatrix[1][0] = 'G';
		btMatrix[2][0] = 'B';
		btMatrix[3][0] = 'I';
		btMatrix[4][0] = 'S';
		btMatrix[5][0] = 'H';
		return btMatrix;
	}
}
