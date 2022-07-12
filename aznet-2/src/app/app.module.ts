// Modulos
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { IframeContainerComponent } from './components/aznet/iframe-container/iframe-container.component';
import { CommonModule } from '@angular/common';
import { FavoritosService } from './services/favoritos.service';
import { LogoutComponent } from './components/logout/logout.component';
//#region Libreria Allianz Imports
import { NX_DATE_LOCALE } from '@allianz/ngx-ndbx/datefield';
import { NxIconModule } from "@allianz/ngx-ndbx/icon";
import { NxButtonModule } from '@allianz/ngx-ndbx/button';
import { NxDatefieldModule } from '@allianz/ngx-ndbx/datefield';
import { NxMomentDateModule } from '@allianz/ngx-ndbx/moment-date-adapter';
import { NX_MOMENT_DATE_FORMATS} from '@allianz/ngx-ndbx/moment-date-adapter';
import { NxInputModule } from '@allianz/ngx-ndbx/input';
import { NxFormfieldModule } from '@allianz/ngx-ndbx/formfield';
import { FilterNroOrdenPipe } from "./pipes/filter-nro-orden.pipe";

import { NxTooltipModule } from '@allianz/ngx-ndbx/tooltip';

//#endregion

//#region
import { MatTreeModule } from '@angular/material/tree';
import { HomeComponent } from "./components/home/home.component";
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';

//#endregion 

// library Apps

//#region // Servicios

import { Menu1Service } from './services/menu.service';
import { EmittersService } from './services/emitters.service';
import { HttpService } from "./services/http.service";
import { UrlParserService } from './services/url-parser.service'
//#endregion

//#region // Pipes
import { TitleCasePipe, CurrencyPipe, DatePipe } from "@angular/common";


//#endregion 

//#region //Components
import { MenuDespComponent } from './components/navbar/userbar/menu-desp/menu-desp.component';
import { MenuDespDesktopComponent2 } from './components/navbar/menubar/menu-desp-desktop2/menu-desp-desktop.component2';
import { AppComponent } from "./app.component";

import { HiddenIframeComponent } from './components/hidden-iframe/hidden-iframe.component';

//#endregion

// Routing
import { AppRoutingModule } from "./app-routing.module";
//Angular 
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authConfig } from "./config/auth-config";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarComponent } from './components/navbar/menubar/menubar.component';
import { UserbarComponent } from './components/navbar/userbar/userbar.component';
import {FilterByCodUbicacionPipe} from './pipes/filter-by-cod-ubicacion.pipe'
import { FilterIdPipe } from './pipes/filter-id.pipe';
import { FilterByIdMenuPipe } from './pipes/filter-by-id-menu.pipe';



registerLocaleData(localeEsAr, "es-AR");

/* TODO: ELIMINAR FILTERS WRAPPER Y GOP */
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
 
    MenubarComponent,
    UserbarComponent,
    
    MenuDespComponent,
    MenuDespDesktopComponent2,
    
    IframeContainerComponent,
    
    LogoutComponent,
    HiddenIframeComponent,
	FilterNroOrdenPipe,
FilterIdPipe,
FilterByIdMenuPipe,
    FilterByCodUbicacionPipe,
    HomeComponent, ],

  // MODULOS Y ROUTING
  imports: [
	AppRoutingModule,
	MatIconModule,
	MatBadgeModule,
	NxIconModule,
	CommonModule,
	MatTreeModule,
	NxTooltipModule,
	MatTabsModule,
	BrowserModule,
	HttpClientModule,
  BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: onAppInit1,
      multi: true,
      deps: [HttpClient, UrlParserService]
    },
    { provide: NX_DATE_LOCALE, useValue: 'es-AR' },
    { provide: LOCALE_ID, useValue: "es-AR" },
  
    HttpService,
    Menu1Service,
    EmittersService,
    TitleCasePipe,
    CurrencyPipe,
    DatePipe,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function onAppInit1(
  _http: HttpClient,
  urlService: UrlParserService
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const url = location.href;
      //debugger
      if (url.includes('postLogin')) {
        let databody = {
          code: urlService.getParamValue(url, 'code'),
          state: urlService.getParamValue(url, 'state'),
          redirect_uri: window.location.origin + '/postLogin'
        }

        _http.post('/public/postLogin', databody).toPromise().then((data: any) => {
          window.location.href = '/'
        }).catch((err: any) => { window.location.href = '/' })
      } else {
        const httpHeaders = new HttpHeaders({
          'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        });
        _http.get('/public/conf', { headers: httpHeaders }).toPromise().then((data: any) => {
          const { result } = data;

          if (result) {
            authConfig.clientId = result.clientId;
            authConfig.oauth2BaseUrl = result.oauth2BaseUrl;
            authConfig.azHomeUrl = result.azHomeUrl;
            authConfig.azWindowUrl = result.azWindowUrl;
            authConfig.baseUrl = result.baseUrl;
            authConfig.replaceUrl = result.replaceUrl;
            authConfig.production = result.production;
            authConfig.hasSession = result.hasSession;

            if (!result.hasSession) {
              window.location.href = authConfig.oauth2BaseUrl + '/oauth/authorize?response_type=code&client_id=' + authConfig.clientId + '&redirect_uri=' + window.location.origin + '/postLogin&scope=allianz&state=' + (Date.now() + Math.random());
            } else {
              _http.get('/api/api/user', { headers: httpHeaders })
                .toPromise()
                .then((data: any) => {
                  const { result } = data;

                  authConfig.userName = result.csmUserName;
                  if (result.parameters && result.parameters.NIVEL_GOP) {

                    authConfig.goplvl = result.parameters.NIVEL_GOP[0];
                    authConfig.codGop = result.parameters.CODIGO_GOP[0];

                  } else {
                    authConfig.goplvl = null;
                  }
                  authConfig.permissions = result.permissions;
                  // console.log(authConfig);
                  resolve("f");
                }).catch(err => { //FIX SI authConfig.hasSession == TRUE
                  if (err.status == '401') {
                    authConfig.hasSession = false;
                    _http.post('/public/logout', {}).subscribe((data: any) => {
                      window.location.href = authConfig.oauth2BaseUrl + '/logout?redirect_uri=' + window.location.origin + '/';
                    })
                  }

                })
            }
          }
        }, (err: any) => {
          reject()
          console.log(err);
        }
        );
      }
    });
  };
}
