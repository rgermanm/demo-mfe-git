import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './common/components/alert/alert.component';
import { BarMessageComponent } from './common/components/bar-message/bar-message.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { PaginatorComponent } from './common/components/paginator/paginator.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop'; 
import { AppService } from './services/app.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { auth } from './common/model/auth';
import { AppInitComponent } from './components/app-init/app-init.component';
import { UrlParserService } from './common/services/url-parser.service';
import { HeaderComponent } from './components/header/header.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { PropertyEditComponent } from './components/property-edit/property-edit.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobEditComponent } from './components/job-edit/job-edit.component';
import { BatchsComponent } from './components/batchs/batchs.component';
import { BatchViewComponent } from './components/batch-view/batch-view.component';
import { BatchDetailViewComponent } from './components/batch-detail-view/batch-detail-view.component';
import { MailsComponent } from './components/mails/mails.component';
import { MailAddComponent } from './components/mail-add/mail-add.component';


//Allianz
import { NxModalModule } from '@allianz/ngx-ndbx/modal';
import { NxSwitcherModule } from '@allianz/ngx-ndbx/switcher'; 

@NgModule({
	declarations: [
		AppComponent,
		AlertComponent,
		BarMessageComponent,
		NotFoundComponent,
		PaginatorComponent,
		HomeComponent,
		AppInitComponent,
		HeaderComponent,
		PropertiesComponent,
		PropertyEditComponent,
		JobsComponent,
		JobEditComponent,
		BatchsComponent,
		BatchViewComponent,
		BatchDetailViewComponent,
		MailsComponent,
		MailAddComponent,
		
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSlideToggleModule,
		MatSelectModule,
		MatDatepickerModule,
		MatMomentDateModule,
		HttpClientModule,
		BrowserAnimationsModule,
		DragDropModule,
		NxModalModule,
		NxSwitcherModule
	],
	providers: [{
		provide: APP_INITIALIZER,
		useFactory: onAppInit,
		multi: true,
		deps: [AppService,UrlParserService]
	},
	{ provide: MAT_DATE_LOCALE, useValue: 'es-AR' }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

export function onAppInit(service: AppService, urlService: UrlParserService): () => Promise<any> {
	return (): Promise<void> => {
		return new Promise((resolve, reject) => {
			const url = location.href;
			if (url.includes("postLogin")) {
				service.postLogin(urlService.getParamValue(url, 'code'),window.location.origin + '/postLogin').toPromise().then(()=>{
					window.location.href = '/priv'
				}).catch(() => { window.location.href = '/' })				
			} else {
				service.conf().toPromise().then(() => {
	                if ( !auth.hasSession ) {
						window.location.href = auth.oauth2.baseUrl + '/oauth/authorize?response_type=code&client_id=' + auth.oauth2.clientId + '&redirect_uri=' + window.location.origin + '/postLogin&state=' + (Date.now() + Math.random());
	                }
	                resolve();
	            } ).catch(( err: any ) => {
	                reject(err);
	            } );
			}			
		});
    };
}

