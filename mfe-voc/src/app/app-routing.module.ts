import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './common/guard/auth.guard';
import {NotFoundComponent} from './common/components/not-found/not-found.component'
import { AppInitComponent } from './components/app-init/app-init.component';
import { PropertiesComponent} from './components/properties/properties.component'; 
import { PropertyEditComponent} from './components/property-edit/property-edit.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobEditComponent } from './components/job-edit/job-edit.component';
import { BatchsComponent } from './components/batchs/batchs.component';
import { BatchViewComponent } from './components/batch-view/batch-view.component';
import { BatchDetailViewComponent } from './components/batch-detail-view/batch-detail-view.component';
import { MailsComponent } from './components/mails/mails.component';
import { MailAddComponent } from './components/mail-add/mail-add.component';

const routes: Routes = [
    {
        path: 'priv', 
        component: HomeComponent, 
        canActivate: [AuthGuard], 
        children: [
			{ path: 'properties', component:  PropertiesComponent},
			{ path: 'properties/:id', component: PropertyEditComponent },
			{ path: 'jobs', component:  JobsComponent},
			{ path: 'jobs/:id', component:  JobEditComponent},
			{ path: 'batch', component:  BatchsComponent},
			{ path: 'batch/:id', component:  BatchViewComponent},
            { path: 'batch/:id/:dId', component:  BatchDetailViewComponent},
            { path: 'mails', component:  MailsComponent},
            { path: 'mails/:id', component:  MailAddComponent},
        ]
    },
	{ path: '', component: AppInitComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


