import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavBarsComponent } from './nav-bars/nav-bars.component';

const routes: Routes = [
  {
    path : '',
    component : NavBarsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
