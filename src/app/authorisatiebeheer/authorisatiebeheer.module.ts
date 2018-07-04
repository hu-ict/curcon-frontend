import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AuthorisatiebeheerComponent } from './authorisatiebeheer.component';
import { UserService } from '../services/user.service';
import { FunctieService } from '../services/functie.service';
import { ModuleService } from '../services/module.service';
import { RolService } from '../services/rol.service';
import { AuthorisatiebeheerRoutingModule } from './authorisatiebeheer-routing.module';
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

@NgModule({
	imports: [
		AuthorisatiebeheerRoutingModule,
		ChartsModule,
		HttpModule,
		BsDropdownModule,
		FormsModule,
		CommonModule,
		TabsModule,
		ModalModule.forRoot(),
		NgbModule.forRoot(),
		],
	declarations: [
		AuthorisatiebeheerComponent,
//		TabsComponent,
//		TablesComponent,
//		ModalsComponent
	],
	providers: [
		UserService,
		RolService,
		ModuleService,
		FunctieService
	]
})
export class AuthorisatiebeheerModule { }
