import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherComponent } from '../other/other.component';
import { Other2Component } from '../other2/other2.component';
import { NavComponent } from './nav.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:NavComponent,
  },
  {
  path:'other',
  pathMatch:'full',
  component:OtherComponent,

},
{
  path:'other2',
  pathMatch:'full',
  component:Other2Component ,

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }
