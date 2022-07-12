import { Injectable, EventEmitter } from '@angular/core';
import { BreadCrumb } from '../components/hidden-iframe/hidden-iframe.component';
​
@Injectable({
    providedIn: 'root'
})
export class EmittersService {
​
    zindexEmiter = new EventEmitter();
    errorAlert = new EventEmitter();
    hideHomeEmitter = new EventEmitter();
    toastEmmitter = new EventEmitter();
    menuPrincipalEmitter = new EventEmitter();
    menuLevel5Emitter = new EventEmitter();
    menuLevel4Emitter = new EventEmitter();
    menuLevel4HiddenFrameEmitter = new EventEmitter()
    breadCrumbEmitter = new EventEmitter();
    menuFavoritosEmitter = new EventEmitter();
    originMenuDesktopEmitter = new EventEmitter();
    actualWindowEmitter = new EventEmitter();
    clickedObjectEmitter = new EventEmitter();
    parejasEmitter = new EventEmitter();
    gopEmitter = new EventEmitter();
    initComponentEmitter = new EventEmitter();
    esGrupoEmitter = new EventEmitter();
    frameURL = new EventEmitter();
    cookieLoadedEmitter = new EventEmitter();
    menuMobileObjectEmitter = new EventEmitter();
    ocultarMenuMobileEmitter = new EventEmitter();
    popUpDetectionEmitter = new EventEmitter();
    putParejasEmitter = new EventEmitter();
    enableActionsEmiter = new EventEmitter();
​
    public setZIndex(valorZindex) {
        this.zindexEmiter.emit(valorZindex);
    }
    public notifyPopUpBlocked(value) {
        this.popUpDetectionEmitter.emit(value);
    }

    public emmiterToast(tipo: enumTipoToast, mensaje: string, timeOut?: number) {
        const toast = {
            mensaje: mensaje,
            error: tipo,
            timeOut: 5000, //default: 5000
        };
        this.toastEmmitter.emit(toast);
    }
​
    public errorHeader(error) {
        this.errorAlert.emit(error);
    }
​
    public frameURLEmit(loggin) {
        this.frameURL.emit(loggin);
    }
​
    public hideHome(ocultarHome) {
        this.hideHomeEmitter.emit(ocultarHome);
    }
​
    public level5Emitter(objeto) {
        this.menuLevel5Emitter.emit(objeto);
    }
    public level4Emitter(objeto) {
        this.menuLevel4Emitter.emit(objeto);
    }
    public hiddenFrameLvl4Emitter(objeto) {
        this.menuLevel4HiddenFrameEmitter.emit(objeto);
    }
    public breadcrumb(objeto: BreadCrumb) {
        this.breadCrumbEmitter.emit(objeto);
    }
    public menuFavorito(menu) {
        this.menuFavoritosEmitter.emit(menu);
    }
    public originMenuDektop(origenMenuDesktop: boolean) {
        this.originMenuDesktopEmitter.emit(origenMenuDesktop);
    }
    public actualWindow(obj) {
        this.actualWindowEmitter.emit(obj);
    }
    public clickedObject(obj) {
        this.clickedObjectEmitter.emit(obj);
    }

    public initComponent(componentName) {
        this.initComponentEmitter.emit(componentName);
    }
    public esGrupo() {
        this.esGrupoEmitter.emit(true);
    }
    public cookieLoaded() {
        this.cookieLoadedEmitter.emit(true);
    }
    public menuMobileEmitterObj(objLvl4) {
        this.menuMobileObjectEmitter.emit(objLvl4);
    }
    public ocultarMenuMobile(boolean) {
        this.ocultarMenuMobileEmitter.emit(boolean);
    }
    public parejasChange() {
        this.putParejasEmitter.emit(true);
    }
    public enableActions(value: boolean) {
        this.enableActionsEmiter.emit(value);
    }
    public emitMenuPrincipal(menu:any[]){
        this.menuPrincipalEmitter.emit(menu)
    }
}

export enum enumTipoToast{
    ERROR,
    WARNING,
    INFO,
    SUCCESS,
}