import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { RollenComponent } from './rollen/rollen.component';
import { RolmodulesComponent } from './rolmodules/rolmodules.component';
import { ModulesComponent } from './modules/modules.component';
import { FunctiesComponent } from './functies/functies.component';

import { FunctieService } from './services/functie.service';
import { ModuleService } from './services/module.service';
import { RolService } from './services/rol.service';
import { UserService } from './services/user.service';


import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    RollenComponent,
    RolmodulesComponent,
    ModulesComponent,
    FunctiesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    FunctieService,
    ModuleService,
    RolService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
