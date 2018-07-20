import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { CohortenService } from '../services/curcon/cohorten.service';
import { CohortenRoutingModule } from './cohorten-routing.module';
import { CohortenComponent } from './cohorten.component';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    CohortenRoutingModule,
    ChartsModule,
    HttpModule,
    BsDropdownModule,
    CommonModule
  ],
  declarations: [ CohortenComponent ],
  providers: [CohortenService]
})
export class CohortenModule { }
