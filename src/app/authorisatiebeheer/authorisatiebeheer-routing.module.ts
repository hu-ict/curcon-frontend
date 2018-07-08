import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorisatiebeheerComponent } from './authorisatiebeheer.component';
import { BFunctionComponent } from './b-function.component';
import { BModuleComponent } from './b-module.component';
import { BRolComponent } from './b-rol.component';
import { BUserComponent } from './b-user.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorisatiebeheerComponent,
    data: {
      title: 'Exampele Pages'
    },
    children: [
      {
        path: 'auth',
        component: AuthorisatiebeheerComponent,
        data: {
          title: 'authorisatiebeheer'
        }
      },
      {
        path: 'function',
        component: BFunctionComponent,
        data: {
          title: 'function'
        }
      },
      {
        path: 'module',
        component: BModuleComponent,
        data: {
          title: 'module'
        }
      },
      {
        path: 'rol',
        component: BRolComponent,
        data: {
          title: 'rol'
        }
      },
      {
        path: 'user',
        component: BUserComponent,
        data: {
          title: 'user'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorisatiebeheerRoutingModule {}
