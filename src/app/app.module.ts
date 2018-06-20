import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import {LocationStrategy, HashLocationStrategy, CommonModule} from '@angular/common';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

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
import { AuthService } from './providers/auth.service';//
import { OrganisatiesService } from './services/curcon/organisaties.service';
// import {  } from './services/curcon/beroepstaken.service';
// import {  } from './services/curcon/.service';
// import {  } from './services/curcon/.service';
// import {  } from './services/curcon/.service';
// import {  } from './services/curcon/.service';
// import {  } from './services/curcon/.service';
// import {  } from './services/curcon/.service';
// import {  } from './services/curcon/.service';
// import {  } from './services/curcon/.service';
// import {  } from './services/curcon/.service';
// import {  } from './services/curcon/.service';
// import {  } from './services/curcon/.service';



// Routing Module
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
//import { AppRoutingModule } from './app-routing.module';
import { AuthorisatiebeheerComponent } from './authorisatiebeheer/authorisatiebeheer.component';
import { TokenButtonComponent } from './token-button/token-button.component';
import { BeroepstaakXComponent } from './beroepstaak-x/beroepstaak-x.component';


// Layouts
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {TooltipModule} from 'ngx-bootstrap';

// Layouts ng-bootstrap/ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule  } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {  } from '@ng-bootstrap/ng-bootstrap';


import { FullLayoutComponent } from './layouts/full-layout.component';
import {HttpModule} from '@angular/http';

import {BtMatrixModule} from './bt-overzicht/bt-matrix.module';
import {BtCalculatedModule} from './bt-calculated/bt-calculated.module';

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
    TokenButtonComponent,
    BeroepstaakXComponent,
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'curcon'),
    AppRoutingModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    ChartsModule,
    BtMatrixModule,
    BtCalculatedModule,
    NgbModule.forRoot(),
    NgbTabsetModule,
    NgbDropdownModule,
    NgbTooltipModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    FunctieService,
    AuthService,
    ModuleService,
    RolService,
    UserService,
    DocentenService,
    OrganisatiesService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
