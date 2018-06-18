import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DocentenService } from '../services/docenten.service';
import { DocentenRoutingModule } from './docenten-routing.module';
import { DocentenComponent } from './docenten.component';
import { OrganisatiesService } from '../services/curcon/organisaties.service';
import { CursussenService } from '../services/curcon/cursussen.service';
import { CommonModule} from '@angular/common';
import { HttpModule} from '@angular/http';
import { OrderModule } from 'ngx-order-pipe';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from '../components/modals.component';

import {FormsModule} from '@angular/forms';
import { DocentComponent } from '../test/docent.component';

@NgModule({
  imports: [
    DocentenRoutingModule,
    FormsModule,
    ChartsModule,
    HttpModule,
    BsDropdownModule,
    CommonModule,
    OrderModule,
    ModalModule.forRoot()
  ],
  declarations: [ DocentenComponent,
    DocentComponent ],
  providers: [ DocentenService, OrganisatiesService, CursussenService ]
})
export class DocentenModule { }
