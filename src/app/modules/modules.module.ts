import { NgModule } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { OrderByPipe } from './orderby.pipe';
import { CommonModule } from '@angular/common';

import { HttpModule } from '@angular/http';

@NgModule({
	imports: [
		HttpModule,
	    CommonModule,
	    OrderModule
	],
	declarations: [
		OrderByPipe
	],
	exports: [
		OrderByPipe
	]
})

export class ModulesModule { }
