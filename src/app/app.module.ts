import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { RollenComponent } from './rollen/rollen.component';
import { RolmodulesComponent } from './rolmodules/rolmodules.component';
import { ModulesComponent } from './modules/modules.component';
import { FunctiesComponent } from './functies/functies.component';
import { LoginsComponent } from './logins/logins.component';
import { DocentenComponent } from './docenten/docenten.component';

import { FunctieService } from './services/functie.service';
import { ModuleService } from './services/module.service';
import { RolService } from './services/rol.service';
import { UserService } from './services/user.service';
import { DocentenService } from './services/docenten.service';
import { AuthService } from './providers/auth.service'; 

import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorisatiebeheerComponent } from './authorisatiebeheer/authorisatiebeheer.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    RollenComponent,
    RolmodulesComponent,
    ModulesComponent,
    FunctiesComponent,
    LoginsComponent,
    DocentenComponent,
    HomeComponent,
    AuthorisatiebeheerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'curcon'),
    AppRoutingModule,
  ],
  providers: [
    FunctieService,
    AuthService,
    ModuleService,
    RolService,
    UserService,
    DocentenService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
