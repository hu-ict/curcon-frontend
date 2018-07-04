import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginsComponent } from './logins/logins.component';
import { RollenComponent } from './rollen/rollen.component';
import { RolmodulesComponent } from './rolmodules/rolmodules.component';
import { ModulesComponent } from './modules/modules.component';
//import { DocentenComponent } from './docenten/docenten.component';
import { UsersComponent } from './users/users.component';
import { FunctiesComponent } from './functies/functies.component';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes : Routes = [//
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'logins',
    component: LoginsComponent
  },
  {
    path: 'rollen',
    component: RollenComponent
  },
  {
    path: 'rolmodules',
    component: RolmodulesComponent
  },
  {
    path: 'modules',
    component: ModulesComponent
  },
  // {
  //   path: 'docenten',
  //   component: DocentenComponent
  // },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'functies',
    component: FunctiesComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
},
{
  path: '',
  component: FullLayoutComponent,
  data: {
    title: 'Home'
  },
  children: [
    {
      path: 'dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
      path: 'opleidingen',
      loadChildren: './opleidingen/opleidingen.module#OpleidingenModule',
    },
    {
      path: 'cursussen',
      loadChildren: './cursussen/cursussen.module#CursussenModule',
    },
    {
      path: 'docenten',
      loadChildren: './docenten/docenten.module#DocentenModule'
    },
    {
    	path: 'authorisatiebeheer',
    	loadChildren: './authorisatiebeheer/authorisatiebeheer.module#AuthorisatiebeheerModule'
    },
    {
      path: 'components',
      loadChildren: './components/components.module#ComponentsModule'
    },
    {
      path: 'icons',
      loadChildren: './icons/icons.module#IconsModule'
    },
    {
      path: 'widgets',
      loadChildren: './widgets/widgets.module#WidgetsModule'
    },
    {
      path: 'charts',
      loadChildren: './chartjs/chartjs.module#ChartJSModule'
    }
  ]
},
{
  path: 'pages',
  component: SimpleLayoutComponent,
  data: {
    title: 'Pages'
  },
  children: [
    {
      path: '',
      loadChildren: './pages/pages.module#PagesModule',
    }
  ]
}

]

@NgModule({
  imports: [ RouterModule.forRoot(routes), NgbModule.forRoot() ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
