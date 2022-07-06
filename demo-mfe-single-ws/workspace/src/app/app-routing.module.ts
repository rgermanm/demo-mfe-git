import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [


{
  path:'wrap',
  loadChildren:()=>import('./../wrappermfe/wrappermfe.module').then((m)=>m.WrappermfeModule)

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
