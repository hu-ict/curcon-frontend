

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginsComponent } from './logins/logins.component';
import { RollenComponent } from './rollen/rollen.component';
import { RolmodulesComponent } from './rolmodules/rolmodules.component';
import { ModulesComponent } from './modules/modules.component';
import { DocentenComponent } from './docenten/docenten.component';
import { UsersComponent } from './users/users.component';
import { FunctiesComponent } from './functies/functies.component';

const routes : Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'logins', component: LoginsComponent},
  {path: 'rollen', component: RollenComponent},
  {path: 'rolmodules', component: RolmodulesComponent},
  {path: 'modules', component: ModulesComponent},
  {path: 'docenten', component: DocentenComponent},
  {path: 'users', component: UsersComponent},
  {path: 'functies', component: FunctiesComponent},
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
