import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: HomeComponent
},
{
  path: 'mf1',
  loadChildren: () =>
    loadRemoteModule({
      remoteName: 'mf1',
      remoteEntry: 'http://localhost:4242/showInfo.js',
      exposedModule: './ShowInfoModule'
    })
      .then(m => m.ShowInfoModule)
},
{
  path: 'mf2',
  loadChildren: () =>
    loadRemoteModule({
      remoteName: 'mf2',
      remoteEntry: 'http://localhost:4443/navEntry.js',
      exposedModule: './NavModule'
    })
      .then(m => m.NavModule)
},
{
  path: 'mfext',
  loadChildren: () =>
    loadRemoteModule({
      remoteName: 'mfext',
      remoteEntry: 'http://localhost:4442/externalEntry.js',
      exposedModule: './ExtModule'
    })
      .then(m => m.ExtModule)
},
{
  path: 'mfApp',
  loadChildren: () =>
    loadRemoteModule({
      remoteName: 'mfApp',
      remoteEntry: 'http://localhost:4443/wrapEntry.js',
      exposedModule: './WrapModule'
    })
      .then(m => m.WrappermfeModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
