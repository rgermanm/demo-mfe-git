import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherComponent } from './other/other.component';
import { Other2Component } from './other2/other2.component';

const routes: Routes = [{
  path:'nav',
  loadChildren:()=>import('./nav/nav.module').then((m)=>m.NavModule)

  
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
