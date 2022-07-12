import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './guard/auth.guard';
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  { path: 'home',canActivate: [AuthGuard], component: HomeComponent },/* core module no es lazy*/
  { path: 'logout', component: LogoutComponent },
  {
    path: '',
    loadChildren: () =>
      loadRemoteModule({
        remoteName: 'azVocFront',
        remoteEntry: 'http://localhost:3002/remoteEntry.js',
        exposedModule: './AppModule'
      })
        .then(m => m.AppModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


