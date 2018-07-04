import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorisatiebeheerComponent } from './authorisatiebeheer.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorisatiebeheerComponent,
    data: {
      title: 'authorisatiebeheer'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorisatiebeheerRoutingModule {}
