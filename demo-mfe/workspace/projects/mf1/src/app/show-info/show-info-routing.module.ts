import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowInfoComponent } from './show-info.component';

const routes: Routes = [{
  path:'',
  component:ShowInfoComponent,
  pathMatch:'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowInfoRoutingModule { }
