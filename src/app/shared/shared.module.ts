import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCompModule } from './material-comp/material-comp.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialCompModule
  ],
  exports:[
    MaterialCompModule
  ]
})
export class SharedModule { }
