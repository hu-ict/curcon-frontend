import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ProfileComponent } from './profile.component';
// import { CursussenService } from '../services/curcon/cursussen.service';
import { ProfileRoutingModule } from './profile-routing.module';
import { CommonModule } from '@angular/common';
import { TablesComponent } from '../components/tables.component';

// Ngb
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from '../components/modals.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from '../components/tabs.component';

import {TooltipModule} from 'ngx-bootstrap';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';

import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {BeroepstakenService} from '../services/curcon/beroepstaken.service';
import {ProfessionalskillsService} from '../services/curcon/professionalskills.service';
import {LeerdoelenService} from '../services/curcon/leerdoelen.service';
import {ToetsenService} from '../services/curcon/toetsen.service';
import {ToetsmatrijzenService} from '../services/curcon/toetsmatrijzen.service';
import {BloomniveausService} from '../services/curcon/bloomniveaus.service';
import {MillerNiveausService} from '../services/curcon/millerniveaus.service';
import {DocentenService} from "../services/docenten.service";
import {BtMatrixModule} from '../bt-overzicht/bt-matrix.module';
import {PsOverzichtModule} from '../ps-overzicht/ps-overzicht.module';

@NgModule({
	imports: [
		// BtMatrixModule,
		// PsOverzichtModule,
		 ProfileRoutingModule,
		// ChartsModule,
		HttpModule,
		BsDropdownModule,
		FormsModule,
		CommonModule,
		TabsModule,
		ModalModule.forRoot(),
		NgbModule.forRoot(),
		],
	declarations: [
		ProfileComponent,
//		TabsComponent,
//		TablesComponent,
//		ModalsComponent
	],
	providers: [
		//CursussenService,
		//DocentenService,
		//BeroepstakenService,
		//ProfessionalskillsService,
		//LeerdoelenService,
		//ToetsenService,
		//ToetsmatrijzenService,
		//BloomniveausService,
		//MillerNiveausService

	]
})
export class ProfileModule { }
