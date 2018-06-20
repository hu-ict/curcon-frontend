import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { TablesComponent } from '../components/tables.component';

// Modal Component
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalsComponent } from '../components/modals.component';

// Tabs Component
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsComponent } from '../components/tabs.component';

import { TooltipModule } from 'ngx-bootstrap';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {PsOverzichtComponent} from '../ps-overzicht/ps-overzicht.component';

@NgModule({
	imports: [
		NgbModule.forRoot(),
		ChartsModule,
		HttpModule,
		NgbDropdownModule,
		FormsModule,
		CommonModule,
		NgbTabsetModule,
		TooltipModule,
//		ModalModule.forRoot()
		],
	declarations: [
		PsOverzichtComponent
	],
	exports: [
		PsOverzichtComponent
	],
	providers: [
	]
})
export class PsOverzichtModule { }
