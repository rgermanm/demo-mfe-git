import { Injectable, ViewChild, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { Menu1Service } from './menu.service';
import { delay } from 'rxjs/operators';

import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { authConfig } from "src/app/config/auth-config";
import { EmittersService, enumTipoToast } from './emitters.service';
import { FavoritosService } from './favoritos.service';
import { UserInformationService } from './user-information.service';
import { UsuarioMenuService } from './usuario-menu.service';

@Injectable({
	providedIn: "root"
})
export class Services {
	public novedades: any[];
  oldNotifications = [];
  newNotifications = [];

	constructor(private router: Router,
		private menuService: Menu1Service,
		private favoritosService:FavoritosService,
		private _http: HttpClient,
		private emittersService: EmittersService,
		private userInformationService:UserInformationService,
		private usuarioService:UsuarioMenuService
	) {

	}

	logout(error) {
		if (typeof error == "string" && error.split(": ")[1].split(" ")[0] == "401") {
			authConfig.hasSession = false;
			this._http.post('/public/logout', {}).subscribe((data: any) => {
				window.location.href = authConfig.oauth2BaseUrl + '/logout?redirect_uri=' + window.location.origin + '/';
			});
		}
	}


	
	public getMenuUsuario(): Promise<any> {

		return this.usuarioService.getUsuario()
			.toPromise()
			.then(res => {
				return this.evaluarRespuesta(res.MenuOut[0], 'menus');
			})
			.catch(error => {
				this.logout(error);
				return new Promise((resolve, reject) => {
					reject(error);
				}
				);
			});
	}


	public getMenu() {

		return this.menuService.getMenu().toPromise()
			.then(res => {

				return this.evaluarRespuesta(res.MenuOut[0], 'menus');
			})
			.catch(error => {
				this.logout(error);
				return new Promise((resolve, reject) => {
					reject(error);
				}
				);
			});
		//***MOCK ***//
		//return this.mockService.getMenuMockPromise();
	}
	
	public getUserInformation(): Promise<any> {
		return this.userInformationService.getUserInformation()
			.toPromise()
			.then(res => {

				return this.evaluarRespuesta(res.InfUsuarioConectadoOut[0], 'infUsuarioConectado');
			})
			.catch(error => {

				this.logout(error);
				return new Promise((resolve, reject) => {
					reject(error);
				}
				);
			});

		//***MOCK ***//
		// return this.mockService.getInfoUsuarioMockPromise();
	}


	public getMenuFavoritos(): Promise<any> {
		return this.favoritosService.getFavoritos().toPromise()
			.then(res => {
				return this.evaluarRespuesta(res.MenuUserFavoritoOut[0], 'menuUsuariosFavoritos');
			})
			.catch(error => {
				this.logout(error);
				return new Promise((resolve, reject) => {
					reject(error);
				}
				);
			});
		//return this.mockService.getFavoritosMockPromise();
	}

	//*************** STOOCK KPI    ***************//


	public putFavoritos(params) {
		this.favoritosService
			.putFavoritos(params)
			.toPromise()
			.then(res => { })
			.catch(error => {
				this.logout(error);
			});
	}

	public deleteFavorito(params) {
		this.favoritosService
			.deleteFavoritos(params)
			.toPromise()
			.then(res => { })
			.catch(error => {
				this.logout(error);
			});
	}

	



	private evaluarRespuesta(httpOut, propiedad): Promise<any> {
		return new Promise((resolve, reject) => {
			if (httpOut.response.responseCode == "200"||httpOut.response.responseCode == null) {
				if (propiedad == null || propiedad == "") {
					resolve(httpOut);
				} else {
					resolve(httpOut[propiedad]);
				}
			} else {

				reject(httpOut.response);
			}
		});
	}

	private validarResponse(objetoResponse: { response: { description?: string, responseCode: number, responseId?: any } }) {
		if (objetoResponse.response.description) {
			console.log(objetoResponse.response.description)
			throw {
				codigo: objetoResponse.response.responseCode,
				descripcion: objetoResponse.response.description,
			}
		}
	}

}
