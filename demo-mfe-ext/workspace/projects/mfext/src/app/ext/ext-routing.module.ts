import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtComponent } from './ext.component';

const routes: Routes = [{
  path:'',
  component:ExtComponent,
  pathMatch:'full'
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtRoutingModule { }
