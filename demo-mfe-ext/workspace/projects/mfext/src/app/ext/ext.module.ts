import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtRoutingModule } from './ext-routing.module';
import { ExtComponent } from './ext.component';


@NgModule({
  declarations: [
    ExtComponent
  ],
  imports: [
    CommonModule,
    ExtRoutingModule
  ]
})
export class ExtModule { }
