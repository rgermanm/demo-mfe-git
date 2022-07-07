import { Component, OnInit } from '@angular/core';
import { AppService } from './../../services/app.service';
import { BaseService } from './../../common/services/base.service';
import { auth } from '../../common/model/auth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	version: string;
	nombreUsuario: string;
	menu = []

	constructor(
		private appService: AppService,
		private baseService: BaseService,
		private router: Router) { }

	ngOnInit(): void {
		this.appService.version().toPromise().then((data)=>{
			this.version='FE: '+auth.versionFE + ' | BO: ' + data;
			this.appService.user().toPromise().then(()=>{
				this.nombreUsuario=auth.user.csmUserName;
				this.appService.menu().toPromise().then((data)=>{
					this.menu=data;
				}).catch((error:any)=>{
					this.baseService.notifyMessage( { message: error, type: 'danger' } );
				});
			}).catch((error:any)=>{
				this.baseService.notifyMessage( { message: error, type: 'danger' } );
			});
		}).catch((error:any)=>{
			this.baseService.notifyMessage( { message: error, type: 'danger' } );
		});
	}

	logout() {
        this.appService.logout().toPromise().then(() => {
            window.location.href = auth.oauth2.baseUrl + '/logout?redirect_uri='+ window.location.origin+ '/';
        } ).catch((  ) => {
            window.location.href = auth.oauth2.baseUrl + '/logout?redirect_uri='+ window.location.origin+ '/';
        } );
    }

	home(){
		this.router.navigate(["priv"]);
	}
}
