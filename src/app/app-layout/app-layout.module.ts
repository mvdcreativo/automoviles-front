import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { MatToolbarModule, MatButtonModule, MatDividerModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { NavBarsComponent } from './nav-bars/nav-bars.component';

@NgModule({
  declarations: [
    NavBarsComponent
  ],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
  ],
  exports: [
    
  ]
})
export class AppLayoutModule { }
