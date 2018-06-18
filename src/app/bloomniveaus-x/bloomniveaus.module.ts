import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { BloomniveausService } from '../services/curcon/bloomniveaus.service';
import { BloomniveausRoutingModule } from './bloomniveaus-routing.module';
import { BloomniveausComponent } from './bloomniveaus.component';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    BloomniveausRoutingModule,
    ChartsModule,
    HttpModule,
    BsDropdownModule,
    CommonModule
  ],
  declarations: [ BloomniveausComponent ],
  providers: [BloomniveausComponent]
})
export class BloomniveausModule { }
