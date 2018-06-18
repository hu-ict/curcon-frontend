import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CommonModule } from '@angular/common';
import { TablesComponent } from '../components/tables.component';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from '../components/modals.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from '../components/tabs.component';

import {TooltipModule} from 'ngx-bootstrap';
import {Tooltip} from "ngx-tooltip";

import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {BoksOverzichtComponent} from '../boks-overzicht/boks-overzicht.component';

@NgModule({
	imports: [
		ChartsModule,
		HttpModule,
		BsDropdownModule,
		FormsModule,
		CommonModule,
		TabsModule,
		TooltipModule,
		ModalModule.forRoot()
		],
	declarations: [ 
		BoksOverzichtComponent
	],
	exports: [ 
		BoksOverzichtComponent 
	],
	providers: [
	]
})
export class BoksOverzichtModule { }
