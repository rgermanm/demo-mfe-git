import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
const routes: Routes = [

  {
    path: 'mfApp',
    loadChildren: () =>
      loadRemoteModule({
        remoteName: 'mfApp',
        remoteEntry: 'http://localhost:3002/wrapEntry.js',
        exposedModule: './WrapModule'
      })
        .then(m => m.WrappermfeModule).catch(err => console.error(err))
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
