import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { OrganisatiesService } from '../services/curcon/organisaties.service';
import { OrganisatiesRoutingModule } from './organisaties-routing.module';
import { OrganisatiesComponent } from './organisaties.component';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    OrganisatiesRoutingModule,
    ChartsModule,
    HttpModule,
    BsDropdownModule,
    CommonModule
  ],
  declarations: [ OrganisatiesComponent ]//,
  //providers: [OrganisatiesService]
})
export class OrganisatiesModule { }
