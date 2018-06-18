import { NgModule } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CommonModule } from '@angular/common';
import { TablesComponent } from '../components/tables.component';
import {FormsModule} from '@angular/forms';

import {TooltipModule} from 'ngx-bootstrap';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from '../components/modals.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from '../components/tabs.component';

import { HttpModule } from '@angular/http';

//import { BeroepstakenComponent } from '../beroepstaken/beroepstaken.component';
import { OpleidingenComponent } from './opleidingen.component';
import { BeroepstakenService } from '../services/curcon/beroepstaken.service';
import { ProfessionalskillsService } from '../services/curcon/professionalskills.service';
import { CursussenService } from '../services/curcon/cursussen.service';
import { OpleidingenService } from '../services/curcon/opleidingen.service';
import { CohortenService } from '../services/curcon/cohorten.service';
import { LeerplannenService } from '../services/curcon/leerplannen.service';
import { ToetsProgrammaService } from '../services/curcon/toetsprogramma.service';
import { BtMatrixModule } from '../bt-overzicht/bt-matrix.module';
import { BtCalculatedModule } from '../bt-calculated/bt-calculated.module';
import { PsOverzichtModule } from '../ps-overzicht/ps-overzicht.module';
import { BoksOverzichtModule } from '../boks-overzicht/boks-overzicht.module';
import { OpleidingenRoutingModule } from './opleidingen-routing.module';

@NgModule({
	imports: [
		PsOverzichtModule,
		BoksOverzichtModule,
		BtMatrixModule,
		BtCalculatedModule,
		OpleidingenRoutingModule,
	    ChartsModule,
	    HttpModule,
	    BsDropdownModule,
	    FormsModule,
	    CommonModule,
	    TabsModule,
	    OrderModule,
	    TooltipModule.forRoot(),
	    ModalModule.forRoot()
	],
	declarations: [
		OpleidingenComponent
	],
	providers: [ 
		LeerplannenService, 
		ToetsProgrammaService,
		OpleidingenService, 
		CohortenService, 
		CursussenService, 
		BeroepstakenService, 
		ProfessionalskillsService 
	]
})

export class OpleidingenModule { }
