import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponentComponent } from './default-component/default-component.component';
import { ShowInfoComponent } from './show-info/show-info.component';

const routes: Routes = [{
  path:'',
  component:DefaultComponentComponent,
  pathMatch:'full'
},
{
  path:'mf1',
  loadChildren:()=>import('./show-info/show-info.module').then((m)=>m.ShowInfoModule)

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
