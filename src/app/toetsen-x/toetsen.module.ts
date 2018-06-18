import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ToetsenService } from '../services/curcon/toetsen.service';
import { ToetsenRoutingModule } from './toetsen-routing.module';
import { ToetsenComponent } from './toetsen.component';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    ToetsenRoutingModule,
    ChartsModule,
    HttpModule,
    BsDropdownModule,
    CommonModule
  ],
  declarations: [ ToetsenComponent ],
  providers: [ToetsenService]
})
export class ToetsenModule { }
