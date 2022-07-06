import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';
import { NavComponent } from './nav.component';
import { OtherComponent } from '../other/other.component';
import { Other2Component } from '../other2/other2.component';


@NgModule({
  declarations: [
    NavComponent,
    OtherComponent,
    Other2Component
  ],
  imports: [
    CommonModule,
    NavRoutingModule
  ]
})
export class NavModule { }
