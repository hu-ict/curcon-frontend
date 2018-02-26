import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import { OpleidingenComponent } from './opleidingen/opleidingen.component';
import { CursussenComponent } from './cursussen/cursussen.component';
import { DocentenComponent } from './docenten/docenten.component';

export const routes: Routes = [
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

  },
  {
    path: 'opleidingen',
    component: OpleidingenComponent,
    data: {
      title: 'Opleidingen'
    },

  },  {
    path: 'cursussen',
    component: CursussenComponent,
    data: {
      title: 'Cursussen'
    },

  },  {
    path: 'docenten',
    component: DocentenComponent,
    data: {
      title: 'Docenten'
    },

  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
