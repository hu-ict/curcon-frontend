import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalsComponent } from './components/modals.component';

// Tabs Component
import { TabsComponent } from './components/tabs.component';

import {Tooltip} from 'ngx-tooltip';


import { OrganisatiesService } from './services/organisaties.service';
import { BeroepstakenService } from './services/beroepstaken.service';
import { ProfessionalskillsService } from './services/professionalskills.service';
import { LeerdoelenService } from './services/leerdoelen.service';
import { ToetsenService } from './services/toetsen.service';
import { ToetsmatrijzenService } from './services/toetsmatrijzen.service';
import { BloomniveausService } from './services/bloomniveaus.service';
import { MillerNiveausService } from './services/millerniveaus.service';
import { DocentenService } from './services/docenten.service';
import { CursussenService } from './services/cursussen.service';
import { OpleidingenService } from './services/opleidingen.service';
import { CohortenService } from './services/cohorten.service';
import { LeerplannenService } from './services/leerplannen.service';
import { ToetsProgrammaService } from './services/toetsprogramma.service';

import { OpleidingenRoutingModule } from './opleidingen/opleidingen-routing.module';
import { CursussenRoutingModule } from './cursussen/cursussen-routing.module';

import { BoksOverzichtComponent } from './boks-overzicht/boks-overzicht.component';
import { PsOverzichtComponent } from './ps-overzicht/ps-overzicht.component';
import { BtCalculatedComponent } from './bt-calculated/bt-calculated.component';
import { BtMatrixComponent } from './bt-matrix/bt-matrix.component';
import { OpleidingenComponent } from './opleidingen/opleidingen.component';
import { CursussenComponent } from './cursussen/cursussen.component';

import {OrderByPipe} from './pipes/orderby.pipe';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    CommonModule,
    ModalModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    ChartsModule,
    CursussenRoutingModule,
    OpleidingenRoutingModule
  ],
  declarations: [
    OrderByPipe,
    AppComponent,
    BtMatrixComponent,
    BtCalculatedComponent,
    PsOverzichtComponent,
    CursussenComponent,
    OpleidingenComponent,
    ModalsComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
   ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    OrganisatiesService,
    OpleidingenService,
    CohortenService,
    CursussenService,
    LeerplannenService,
    ToetsProgrammaService,
    BeroepstakenService,
    ProfessionalskillsService

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
